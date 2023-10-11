import pandas as pd
from statsmodels.tsa.arima.model import ARIMA
import joblib
import os


# Function to fit ARIMA model and make predictions
def fit_arima(train_data, order):
    model = ARIMA(train_data, order=order)
    model_fit = model.fit()
    return model_fit


# Function to train ARIMA models and save them to files
def train_and_save_arima_models(dataframe, p_d_q_values, output_directory):
    trained_models = {}

    for ticker_symbol, order in p_d_q_values.items():
        data = dataframe['Close'].values
        trained_model = fit_arima(data, order)
        trained_models[ticker_symbol] = trained_model

        # Save the trained model to a file in the specified output directory
        model_filename = os.path.join(output_directory, f'arima_model_{ticker_symbol}.joblib')
        joblib.dump(trained_model, model_filename)

    return trained_models


# Modified data preprocessing function that includes ARIMA model training
def ARIMA_Preprocess(tickers, start_date, p_d_q_values, output_directory, dataset_path):
    filtered_dfs = {}  # Store filtered DataFrames for each ticker
    trained_models = {}  # Store trained ARIMA models for each ticker

    for ticker in tickers:
        # Read the data CSV for the current ticker
        df = pd.read_csv(f"{dataset_path}/{ticker}_Daily_Data.csv")

        # Convert the 'Date' column to datetime if it's not already
        df['Date'] = pd.to_datetime(df['Date'])

        # Filter the DataFrame to keep rows from the start_date onwards
        filtered_df = df[df['Date'] >= start_date]

        # Reset the index of the filtered DataFrame
        filtered_df.reset_index(drop=True, inplace=True)

        # Store the filtered DataFrame in the dictionary
        filtered_dfs[ticker] = filtered_df

    # Create the output directory if it doesn't exist
    os.makedirs(output_directory, exist_ok=True)

    # Step 2: Train and Save ARIMA Models for Each Ticker
    for ticker in tickers:
        # Load filtered DataFrame for the current ticker
        df = filtered_dfs[ticker]
        
        # Train and save ARIMA model for the current ticker in the specified output directory
        trained_models = train_and_save_arima_models(df, {ticker: p_d_q_values[ticker]}, output_directory)

        # Access trained ARIMA model for the current ticker
        arima_model = trained_models[ticker]

    return filtered_dfs, trained_models
