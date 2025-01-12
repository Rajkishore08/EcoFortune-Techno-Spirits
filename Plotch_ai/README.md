# Eco Fortune Chatbot  

**Eco Fortune** is an intelligent chatbot that supports the platform's mission of promoting sustainable finance and environmental responsibility. It serves as an interactive guide, assisting users in understanding the principles of eco-conscious investments and sustainable financial growth.  

## About the Project  

Eco Fortune combines financial growth with environmental responsibility. The chatbot is designed to:  
- **Promote Sustainable Finance**: Encourage investments in green technologies and eco-conscious businesses.  
- **Foster Environmental Stewardship**: Align profitability with environmental sustainability.  
- **Educate Users**: Provide insights into green investments and how they contribute positively to the planet.  

## Features  
- **Interactive Assistance**: Answers queries about sustainable finance and eco-friendly investment opportunities.  
- **Educational Resources**: Shares knowledge about green technologies and businesses.  
- **User-Friendly Interface**: Built with Streamlit for an accessible and engaging experience.  

## How to Run the Chatbot  

### Prerequisites  
- Python 3.8 or higher.  
- All dependencies listed in `requirements.txt`.  

### Installation  
1. Clone the repository:  
```bash  
git clone https://github.com/Rajkishore08/EcoFortune-Techno-Spirits.git  
cd eco-fortune-chatbot  
```
2. Install the required dependencies:
```bash
Copy code
pip install -r requirements.txt
```
3. Running the Chatbot
Open the project folder and start the backend:
```bash
python backend.py  
```
4. Open a split terminal, navigate to the frontend directory, and run:
```bash
streamlit run frontend.py  
```
5. Access the application in your browser at:
```bash
http://localhost:8501/  
```
![chat bot 1](https://github.com/user-attachments/assets/3f1f1b44-7739-4d92-a254-9be25939b5e3)

Training Data :
The chatbot has been trained using a comprehensive document that provides insights into sustainable finance.
You can access the training document here: https://drive.google.com/file/d/1Ghe-Tftqk7d4qe0cNsyhS7OpzuP0gK9H/view?usp=sharing

Folder Structure
```bash
Plotch_ai/  
├── backend.py          # Backend logic for handling queries  
├── frontend.py         # Streamlit app for user interface  
├── requirements.txt    # Dependencies for the project  
├── static/ logo.png    # Additional resources  
└── README.md           # Project documentation  
```
Future Enhancements
- Integrate advanced NLP models for more accurate responses.
- Expand the dataset to include more topics on sustainable finance.
- Add voice input and output capabilities.
