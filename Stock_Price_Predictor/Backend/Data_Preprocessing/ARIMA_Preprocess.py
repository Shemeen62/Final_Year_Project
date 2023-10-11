import pandas as pd


def ARIMA_Preprocess(ticker, start_date, dataset_path):

    # for ticker in tickers:
    # Read the data CSV for the current ticker
    df = pd.read_csv(f"{dataset_path}/{ticker}_Daily_Data.csv")

    # Convert the 'Date' column to datetime if it's not already
    df['Date'] = pd.to_datetime(df['Date'])

    # Filter the DataFrame to keep rows from the start_date onwards
    filtered_df = df[df['Date'] >= start_date]

    # Reset the index of the filtered DataFrame
    filtered_df.reset_index(drop=True, inplace=True)

    # Set 'Date' column as the index
    filtered_df.set_index('Date', inplace=True)

    return filtered_df