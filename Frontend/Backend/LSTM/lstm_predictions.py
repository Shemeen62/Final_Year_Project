import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.preprocessing import MinMaxScaler
from keras.models import load_model
import joblib
import os
import Data_Preprocessing.LSTM_Preprocess as LSTM_Preprocess


def make_future_predictions(model, close_scaler, volume_scaler, df, time_step, num_days):

    # Set a fixed seed for random number generation
    np.random.seed(0)
    
    # Create a copy of the original dataframe
    df_copy = df.copy()

    # Initialize an empty array to store future predictions
    future_predictions = []
    future_dates = []  # To store corresponding dates

    # Loop to make predictions for the specified number of days
    for _ in range(num_days):
        # Prepare the data for the current window
        df_window = df_copy.iloc[-time_step:]
        df_window['Close'] = close_scaler.transform(df_window['Close'].values.reshape(-1, 1))
        df_window['Volume'] = volume_scaler.transform(df_window['Volume'].values.reshape(-1, 1))
        x_window = df_window[['Close', 'Volume', 'sentiment_score']].values.reshape(1, -1, 3)  # 3 features

        # Make a prediction for the next day
        prediction = model.predict(x_window)
        prediction = close_scaler.inverse_transform(prediction)

        # Append the prediction to the future_predictions array
        future_predictions.append(prediction[0][0])

        # Get the date of the next day
        next_day_date = df_copy.index[-1] + pd.DateOffset(1)
        future_dates.append(next_day_date)

        # Update the dataframe for the next iteration
        new_data_point = np.random.uniform(0.9, 1.1) * df_copy.iloc[-1]['Close']
        new_volume = np.random.uniform(0.9, 1.1) * df_copy.iloc[-1]['Volume']
        new_sentiment = np.random.uniform(0, 1)  # Random sentiment score for demonstration
        new_data = pd.DataFrame({'Close': [new_data_point], 'Volume': [new_volume], 'sentiment_score': [new_sentiment]}, index=[next_day_date])
        df_copy = pd.concat([df_copy, new_data])

    return future_dates, future_predictions


def lstm_predicted_results(stock_symbol, number_of_days):
    # tk = input("Enter the stock symbol (e.g., MSFT): ")
    # num_days_future = int(input("Enter the number of days for future predictions: "))
    tk = stock_symbol
    num_days_future = number_of_days

    # Define the directory where the trained models are stored
    model_dir = 'trained_lstm_models_with_sentiment'

    # Load MinMaxScalers for closing prices and trading volumes
    close_scaler = joblib.load(os.path.join(model_dir, tk + '_close_scaler.joblib'))
    volume_scaler = joblib.load(os.path.join(model_dir, tk + '_volume_scaler.joblib'))

    # Load the pre-trained model
    model = load_model(os.path.join(model_dir, tk + '_stock_prediction_with_volume_sentiment.keras'))

    # # Load historical data for the specified stock symbol
    df = LSTM_Preprocess.preprocess_stock_data(tk)
    df_original = df.copy()

    time_step = 100

    # Make future predictions
    future_dates, future_predictions = make_future_predictions(model, close_scaler, volume_scaler, df, time_step, num_days_future)

    print("------------------LSTM--------------------")

    # Print the future predictions with dates
    for date, prediction in zip(future_dates, future_predictions):
        print(f"Date: {date.strftime('%Y-%m-%d')}, Predicted Price: {prediction:.2f}")

    # Plot the future predictions
    plt.figure(figsize=(12, 6))
    plt.plot(future_dates, future_predictions, marker='o', linestyle='-', color='b', label='Predicted Price')
    plt.xlabel('Date')
    plt.ylabel('Stock Price')
    plt.title('Future Stock Price Predictions')
    plt.legend()
    plt.grid(True)
    plt.xticks(rotation=45)
    plt.tight_layout()
    plt.show()


    # Create a dictionary to store the date and predicted price
    predicted_prices = {}

    for i, date in enumerate(future_dates):
        predicted_prices[date.strftime('%Y-%m-%d')] = future_predictions[i]

    return predicted_prices