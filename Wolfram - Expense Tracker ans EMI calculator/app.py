from flask import Flask, render_template, request, jsonify
import wolframalpha
from datetime import datetime, timedelta

app = Flask(__name__)
wolfram_client = wolframalpha.Client("YOUR_WOLFRAM_APP_ID")

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/query', methods=['POST'])
def query_wolfram():
    user_query = request.form['query']
    try:
        res = wolfram_client.query(user_query)
        if hasattr(res, 'pods'):
            results = []
            for pod in res.pods:
                for sub in pod.subpods:
                    if sub.plaintext:
                        results.append({'title': pod.title, 'text': sub.plaintext})
            return jsonify(results=results)
        else:
            return jsonify(error="No results found.")
    except Exception as e:
        return jsonify(error=str(e))

@app.route('/predict_expenses', methods=['POST'])
def predict_expenses():
    try:
        expenses = request.get_json()
        if not expenses:
            return jsonify(error="No expense data provided."), 400

        query_parts = []
        for item in expenses:
            query_parts.append(f"{item['category']} expense of {item['amount']} on {item['date']}")

        query = f"predict future trend of {' and '.join(query_parts)}"
        res = wolfram_client.query(query)

        if hasattr(res, 'pods'):
            predictions = []
            for pod in res.pods:
                for sub in pod.subpods:
                    if sub.plaintext:
                        predictions.append({'title': pod.title, 'text': sub.plaintext})
            return jsonify(predictions=predictions)
        else:
            return jsonify(info="Wolfram Alpha could not generate a specific prediction based on the input. It might offer general trend information."), 200

    except Exception as e:
        return jsonify(error=str(e)), 500

@app.route('/predict_emi', methods=['POST'])
def predict_emi():
    try:
        data = request.get_json()
        loan_amount = data.get('loan_amount')
        interest_rate = data.get('interest_rate')
        loan_tenure = data.get('loan_tenure')  # in years
        future_interest_rate = data.get('future_interest_rate')

        if not all([loan_amount, interest_rate, loan_tenure, future_interest_rate]):
            return jsonify(error="Missing loan parameters."), 400

        query = f"calculate EMI for loan amount {loan_amount} at interest rate {interest_rate}% over {loan_tenure} years and also calculate EMI if interest rate changes to {future_interest_rate}%"
        res = wolfram_client.query(query)

        if hasattr(res, 'pods'):
            emi_predictions = []
            for pod in res.pods:
                for sub in pod.subpods:
                    if sub.plaintext:
                        emi_predictions.append({'title': pod.title, 'text': sub.plaintext})
            return jsonify(emi_predictions=emi_predictions)
        else:
            return jsonify(info="Wolfram Alpha could not generate a specific EMI prediction with the given future interest rate, but provides general EMI calculations."), 200

    except Exception as e:
        return jsonify(error=str(e)), 500

if __name__ == '__main__':
    app.run(debug=True)