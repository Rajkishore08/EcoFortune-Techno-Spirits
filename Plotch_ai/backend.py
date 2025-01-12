import os
from flask import Flask, request, jsonify
from groclake.vectorlake import VectorLake
from groclake.datalake import DataLake
from groclake.modellake import ModelLake

# Flask App
app = Flask(__name__)

# Set API key and account ID
GROCLAKE_API_KEY = '26657d5ff9020d2abefe558796b99584'
GROCLAKE_ACCOUNT_ID = '675252b8f7cb974f9f005dbc13c43e9c'

# Set environment variables
os.environ['GROCLAKE_API_KEY'] = GROCLAKE_API_KEY
os.environ['GROCLAKE_ACCOUNT_ID'] = GROCLAKE_ACCOUNT_ID

# Initialize components
vectorlake = VectorLake()
datalake = DataLake()
modellake = ModelLake()

# Global variables to store IDs
datalake_id = None
vectorlake_id = None

@app.route('/upload_document', methods=['POST'])
def upload_document():
    """Upload a document to DataLake and process it for VectorLake."""
    global datalake_id, vectorlake_id

    try:
        # Step 1: Create DataLake and VectorLake if not already created
        if not datalake_id:
            datalake_create = datalake.create()
            datalake_id = datalake_create.get("datalake_id")
            if not datalake_id:
                return jsonify({"error": "Failed to create DataLake"}), 500
        
        if not vectorlake_id:
            vector_create = vectorlake.create()
            vectorlake_id = vector_create.get("vectorlake_id")
            if not vectorlake_id:
                return jsonify({"error": "Failed to create VectorLake"}), 500

        # Step 2: Push the document to DataLake
        payload_push = {
            "datalake_id": datalake_id,
            "document_type": "url",
            "document_data": request.json.get("document_url")
        }
        data_push = datalake.push(payload_push)
        document_id = data_push.get("document_id")
        if not document_id:
            return jsonify({"error": "Failed to push document."}), 500

        # Step 3: Fetch and process the document
        payload_fetch = {
            "document_id": document_id,
            "datalake_id": datalake_id,
            "fetch_format": "chunk",
            "chunk_size": "500"
        }
        data_fetch = datalake.fetch(payload_fetch)
        document_chunks = data_fetch.get("document_data", [])

        # Step 4: Push chunks to VectorLake
        for chunk in document_chunks:
            vector_doc = vectorlake.generate(chunk)
            vectorlake.push({
                "vector": vector_doc.get("vector"),
                "vectorlake_id": vectorlake_id,
                "document_text": chunk,
                "vector_type": "text"
            })

        return jsonify({"message": "Document processed successfully!"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/chat', methods=['POST'])
def chat():
    """Chat endpoint for processing user queries."""
    try:
        query = request.json.get("query")
        if not query:
            return jsonify({"error": "Query is required."}), 400

        vector_search_data = vectorlake.generate(query)
        search_payload = {
            "vector": vector_search_data.get("vector"),
            "vectorlake_id": vectorlake_id,
            "vector_type": "text",
        }
        search_response = vectorlake.search(search_payload)
        enriched_context = " ".join([result.get("vector_document", "") for result in search_response.get("results", [])])

        payload = {
            "messages": [
                {"role": "system", "content": "You are a financial assistant providing accurate guidance on green investments."},
                {"role": "user", "content": f"Using the following context: {enriched_context}, answer the question: {query}."}
            ]
        }
        chat_response = modellake.chat_complete(payload)
        return jsonify({"answer": chat_response.get("answer", "No answer received.")}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
