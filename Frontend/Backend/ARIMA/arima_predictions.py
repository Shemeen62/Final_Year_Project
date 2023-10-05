import joblib
import pandas as pd
import os
from Data_Preprocessing.ARIMA_Preprocess import ARIMA_and_RL_Agent_Preprocess as preprocess


# Function to load a saved ARIMA model and make future predictions
def predict_future_prices(stock_ticker, num_days, models_directory):
    # Load the saved model for the chosen stock from the specified directory
    model_filename = os.path.join(models_directory, f'arima_model_{stock_ticker}.joblib')
    user_model = joblib.load(model_filename)

    # Fetch historical data for the chosen stock
    df = preprocess(stock_ticker, '2022-03-01')

    # Determine the last date in the historical data
    last_date = df.index[-1]

    # Generate date range for the next num_days days
    future_dates = pd.date_range(start=last_date + pd.DateOffset(days=1), periods=num_days)

    # Make predictions for the user's chosen stock for the next num_days days
    future_predictions = user_model.forecast(steps=num_days)

    # Create a dictionary to store the date and predicted price
    predicted_prices = {}

    for i, date in enumerate(future_dates):
        predicted_prices[date.strftime('%Y-%m-%d')] = future_predictions[i]

    return predicted_prices


# Example usage:
def arima_predicted_results(stock_symbol, number_of_days):
    # user_ticker = input("Enter a stock ticker (e.g., AAPL, MSFT, ORCL): ")
    # user_days = int(input("Enter the number of future days for prediction: "))
    user_ticker = stock_symbol
    user_days = number_of_days

    models_directory = "trained_arima_models"  # Update to match the directory where models are saved

    predictions = predict_future_prices(user_ticker, user_days, models_directory)
    
    # Print the predicted prices
    print("------------------ARIMA--------------------")
    for date, price in predictions.items():
        print(f"Date: {date}, Predicted Price: {price}")

    return predictions
