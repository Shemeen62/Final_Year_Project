import pandas as pd
from ARIMA.arima_model import ARIMA_and_RL_Agent_Preprocess

def arima_train(symbols,start_date):
    # Define your list of tickers
    tickers = symbols  # Replace with your list of tickers
    
    # Define your desired start date
    start_date = pd.to_datetime(start_date)  # Change this to your desired start date
    
    # Define (p, d, q) values for each ticker
    p_d_q_values = {
        "AAPL": (1, 1, 2),
        "MSFT": (2, 1, 2),
        "ORCL": (2, 1, 2),
        # Add more tickers and their corresponding (p, d, q) values here
    }
    
    # Define the output directory within the current directory
    output_directory = "trained_arima_models"
    
    # Step 1: Perform Data Preprocessing and Save Filtered DataFrames
    filtered_data, _ = ARIMA_and_RL_Agent_Preprocess(tickers, start_date, p_d_q_values, output_directory)

    print("ARIMA Training process completed.")

