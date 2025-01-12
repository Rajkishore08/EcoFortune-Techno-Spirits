# Wolfram API Demo Application

This is a simple web application that demonstrates the use of the Wolfram Alpha API for querying information and performing basic predictive analysis for expenses and EMI calculations.

## Functionality

The application provides the following features:

1. **General Wolfram Alpha Queries:**
    *   Allows users to enter any query they would normally ask Wolfram Alpha.
    *   Displays the structured results returned by the Wolfram API.

2. **Expense Prediction:**
    *   Enables users to input a list of past expenses, including the category, amount, and date.
    *   Uses the Wolfram API to attempt to predict future expense trends based on the provided historical data. Note that Wolfram Alpha's predictive capabilities for expenses may vary.

3. **EMI Prediction:**
    *   Allows users to input loan parameters such as loan amount, current interest rate, and loan tenure.
    *   Users can also input a potential future interest rate.
    *   The application uses the Wolfram API to calculate and display the EMI for both the current and the future interest rates, helping users understand the impact of interest rate changes.

## Prerequisites

Before running the application, ensure you have the following installed:

*   **Python 3.6 or higher:**  You can download Python from [python.org](https://www.python.org/).
*   **pip:**  Python's package installer, usually included with Python installations.

## Setup

1. **Clone the repository (if applicable) or create the files:**
    Create a directory for your project and save the following files inside it: `app.py` and a subdirectory named `templates` containing `index.html`.

2. **Install the required Python libraries:**
    Open a terminal or command prompt, navigate to your project directory, and run the following command:
    ```bash
    pip install Flask wolframalpha
    ```
    This will install the Flask web framework and the Wolfram Alpha API client library.

3. **Obtain a Wolfram Alpha API Key:**
    *   Go to the Wolfram Developer Portal: [https://developer.wolfram.com/](https://developer.wolfram.com/)
    *   Sign up for an account or log in.
    *   Create a new App and obtain your API key (App ID).

4. **Configure the API Key:**
    *   Open the `app.py` file.
    *   Locate the following line:
        ```python
        wolfram_client = wolframalpha.Client("YOUR_WOLFRAM_APP_ID")
        ```
    *   Replace `"YOUR_WOLFRAM_APP_ID"` with the actual App ID you obtained from the Wolfram Developer Portal.

## Running the Application

1. **Navigate to the project directory:**
    Open a terminal or command prompt and navigate to the directory where you saved `app.py`.

2. **Run the Flask application:**
    Execute the following command:
    ```bash
    python app.py
    ```
    This will start the Flask development server. You should see output indicating that the server is running, typically on `http://127.0.0.1:5000/`.

3. **Access the application in your browser:**
    Open your web browser and go to the address shown in the terminal (usually `http://127.0.0.1:5000/`).

## Using the Application

Once the application is running in your browser, you can interact with the different features:

*   **Ask Wolfram Alpha:**
    *   In the "Ask Wolfram Alpha" section, enter your query in the input field and click the "Ask" button.
    *   The results from the Wolfram API will be displayed below the button.

*   **Predict Future Expenses:**
    *   In the "Predict Future Expenses" section, enter your past expenses in the text area. Each expense should be on a new line with the format: `category,amount,YYYY-MM-DD`. For example:
        ```
        food,30,2023-11-15
        rent,1000,2023-11-01
        ```
    *   Click the "Predict Expenses" button. The application will send this data to the Wolfram API and display any trend predictions or related information returned.

*   **Predict EMI Change:**
    *   In the "Predict EMI Change" section, fill in the input fields for:
        *   **Loan Amount:** The principal amount of the loan.
        *   **Current Interest Rate (%):** The current annual interest rate.
        *   **Loan Tenure (years):** The duration of the loan in years.
        *   **Future Interest Rate (%):** The potential future annual interest rate you want to evaluate.
    *   Click the "Predict EMI" button. The application will calculate and display the EMI for both the current and the future interest rates.

## Disclaimer

The expense and EMI prediction features rely on the capabilities of the Wolfram Alpha API. The accuracy and relevance of the predictions may vary depending on the complexity of the data and the specific query.

## Further Development

This is a basic demonstration. Potential areas for further development include:

*   **User Interface Enhancements:** Improving the look and feel of the website.
*   **Data Storage:** Implementing a database to store user expenses and loan information.
*   **More Sophisticated Predictions:** Integrating other forecasting libraries or techniques for more advanced predictions.
*   **Error Handling and Validation:** Adding more robust error handling and input validation.
*   **User Authentication:** Implementing user accounts and secure data management.