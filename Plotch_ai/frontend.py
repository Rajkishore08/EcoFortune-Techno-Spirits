import streamlit as st
import requests
import base64

def get_base64_encoded_image(image_path):
    with open(image_path, "rb") as img_file:
        return base64.b64encode(img_file.read()).decode()
# Flask API endpoint for chatbot
CHAT_URL = "http://127.0.0.1:5000/chat"

# Configure Streamlit app with a dark theme
st.set_page_config(page_title="EcoFortune AI Assistant", layout="wide")

# Custom CSS for dark theme and enhanced UI
st.markdown(
    """
    <style>
    /* Base styles */
    body {
        background: linear-gradient(to bottom, #1a1b2e, #13141f);
        font-family: 'Inter', system-ui, -apple-system, sans-serif;
    }

    .stApp {
        margin: 0 auto;
        padding: 20px;
    }

    /* Header */
    .header-logo {
        background: rgba(44, 44, 62, 0.7);
        border-radius: 16px;
        padding: 24px;
        margin-bottom: 24px;
        text-align: center;
        border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .header-logo img {
        width: 100px;
        height: 80px;
        border-radius: 12px;
        margin-bottom: 16px;
    }

    .header-logo h1 {
        color: #00f2c3;
        font-size: 28px;
        margin-bottom: 8px;
    }

    .header-logo p {
        color: #a8b2d1;
        font-size: 16px;
    }

    /* Chat container */
    .chat-container {
        background: rgba(44, 44, 62, 0.7);
        border-radius: 16px;
        padding: 24px;
        margin-bottom: 24px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        min-height: 400px;
        max-height: 600px;
        overflow-y: auto;
    }

    /* Messages */
    .assistant-message, .user-message {
        padding: 16px;
        border-radius: 12px;
        margin-bottom: 16px;
        max-width: 80%;
        line-height: 1.5;
    }

    .assistant-message {
        background: rgba(59, 59, 77, 0.9);
        color: #f8f9fa;
        margin-right: auto;
    }

    .user-message {
        background: linear-gradient(135deg, #00f2c3, #0098f0);
        color: white;
        margin-left: auto;
    }

    /* Input area */
    .message-input-container {
        background: rgba(44, 44, 62, 0.7);
        border-radius: 16px;
        padding: 16px;
        display: flex;
        gap: 12px;
        align-items: center;
        border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .message-input-container input[type="text"] {
        flex: 1;
        padding: 12px 16px;
        border-radius: 8px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(59, 59, 77, 0.9);
        color: white;
        font-size: 16px;
    }

    .message-input-container input[type="text"]:focus {
        outline: none;
        border-color: #00f2c3;
    }

    .message-input-container button {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: linear-gradient(135deg, #00f2c3, #0098f0);
        border: none;
        color: white;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    /* Footer */
    .footer {
        text-align: center;
        color: #a8b2d1;
        font-size: 14px;
        padding: 16px;
    }

    .footer a {
        color: #00f2c3;
        text-decoration: none;
    }

    /* Loading animation */
    .loader {
        display: flex;
        justify-content: center;
        gap: 8px;
        padding: 16px;
    }

    .loader div {
        width: 8px;
        height: 8px;
        background: #00f2c3;
        border-radius: 50%;
        animation: pulse 1s infinite ease-in-out;
    }

    .loader div:nth-child(2) { animation-delay: 0.2s; }
    .loader div:nth-child(3) { animation-delay: 0.4s; }

    @keyframes pulse {
        0%, 100% { transform: scale(0.5); opacity: 0.5; }
        50% { transform: scale(1); opacity: 1; }
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
        .stApp {
            padding: 12px;
        }

        .header-logo, .chat-container, .message-input-container {
            border-radius: 12px;
            padding: 16px;
        }

        .assistant-message, .user-message {
            max-width: 90%;
            padding: 12px;
        }
    }
</style>
    """,
    unsafe_allow_html=True,
)

# Logo and header
logo_base64 = get_base64_encoded_image("./static/logo.png")
st.markdown(
    f"""
    <div class="header-logo">
        <img src="data:image/png;base64,{logo_base64}" alt="EcoFortune Logo">
        <h1>EcoFortune AI Assistant</h1>
        <p>Powered by <strong>Groclake</strong></p>
    </div>
    """,
    unsafe_allow_html=True,
)

# Chat container
# st.markdown('<div class="chat-container">', unsafe_allow_html=True)

# Initialize conversation state
if "conversation" not in st.session_state:
    st.session_state["conversation"] = []

# Display chat history
for entry in st.session_state["conversation"]:
    if entry["role"] == "user":
        st.markdown(f'<div class="user-message">{entry["content"]}</div>', unsafe_allow_html=True)
    else:
        st.markdown(f'<div class="assistant-message">{entry["content"]}</div>', unsafe_allow_html=True)

# st.markdown('</div>', unsafe_allow_html=True)

# Input area for user query
st.markdown('<div class="message-input-container">', unsafe_allow_html=True)

# Function to handle chat submission
def submit_query():
    user_query = st.session_state["user_query"]
    if user_query.strip():
        # Add user's query to conversation
        st.session_state["conversation"].append({"role": "user", "content": user_query})

        # Show loading animation while waiting for response
        with st.empty():
            st.markdown('<div class="loader"><div></div><div></div><div></div></div>', unsafe_allow_html=True)

        # Send the query to the backend
        try:
            response = requests.post(CHAT_URL, json={"query": user_query})
            if response.status_code == 200:
                answer = response.json().get("answer", "I'm sorry, I couldn't find an answer.")
                st.session_state["conversation"].append({"role": "assistant", "content": answer})
            else:
                st.session_state["conversation"].append(
                    {"role": "assistant", "content": "There was an error processing your message."}
                )
        except requests.exceptions.RequestException as e:
            st.session_state["conversation"].append(
                {"role": "assistant", "content": f"Connection error: {e}"}
            )
        
        # Clear the input box after submission
        st.session_state["user_query"] = ""

# User input for query
st.text_input("", key="user_query", placeholder="Type your message here...", on_change=submit_query, max_chars=200)

# Send button (Arrow icon)
st.markdown(
    """
    <div class="message-input-container">
        <button onclick="submit_query()">↩</button>
    </div>
    """,
    unsafe_allow_html=True,
)

st.markdown('</div>', unsafe_allow_html=True)

# Footer
st.markdown(
    """
    <div class="footer">
        EcoFortune AI Assistant By Team Techno Spirits © 2025 | Powered by <a href="https://groclake.com" target="_blank">Groclake</a> 🌱
    </div>
    """,
    unsafe_allow_html=True,
)
