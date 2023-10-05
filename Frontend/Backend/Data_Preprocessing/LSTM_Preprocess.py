import pandas as pd


def preprocess_stock_data(ticker):
    # Reading the data csv
    df_price = pd.read_csv(f"Datasets/{ticker}_Daily_Data.csv")
    df_news = pd.read_csv(f"Datasets/{ticker}_News_Content.csv")

    # Convert the 'Date' column to datetime if it's not already
    df_price['Date'] = pd.to_datetime(df_price['Date'])

    # Specify the date from which you want to keep the rows
    start_date = pd.to_datetime('2022-03-01')  # Change this to your desired start date

    # Filter the DataFrame to keep rows from the start_date onwards
    df_price = df_price[df_price['Date'] >= start_date]

    # Reset the index of the filtered DataFrame
    df_price.reset_index(drop=True, inplace=True)

    # Extract date components
    df_news['Date'] = pd.to_datetime(df_news['time_published'], format='%Y%m%dT%H%M%S').dt.date

    # Convert date to datetime format
    df_news['Date'] = pd.to_datetime(df_news['Date'])

    # Define a custom function to determine if a given date is a weekend
    def is_weekend(date):
        return date.weekday() >= 5  # 5 and 6 represent Saturday and Sunday

    # Create a new column 'Date_adjusted' that shifts weekend dates to the next Monday
    df_news['Date'] = df_news['Date'].apply(lambda x: x + pd.DateOffset(days=2) if is_weekend(x) else x)

    # Drop unnecessary columns
    columns_to_drop = ['ticker', 'time_published', 'overall_sentiment_label', 'ticker_sentiment_label']
    df_news.drop(columns=columns_to_drop, inplace=True)

    # Group by 'Date_adjusted' and concatenate titles and summaries into a single paragraph
    agg_functions = {
        'title': ' '.join,  # Concatenate titles
        'summary': ' '.join,  # Concatenate summaries
        'overall_sentiment_score': 'mean',  # Calculate the mean
        'relevance_score': 'mean',  # Calculate the mean
        'ticker_sentiment_score': 'mean'  # Calculate the mean
    }

    df_news = df_news.groupby('Date').agg(agg_functions).reset_index()

    # Rename columns if needed
    df_news.rename(columns={'overall_sentiment_score': 'average_overall_sentiment_score',
                            'relevance_score': 'average_relevance_score',
                            'ticker_sentiment_score': 'average_ticker_sentiment_score'},
                   inplace=True)

    # Define a custom function to apply the condition
    def calculate_sentiment(score):
        if score > 0:
            return int(1)
        else:
            return int(0)

    # Apply the custom function to create the 'sentiment score' column
    df_news['sentiment_score'] = df_news['average_overall_sentiment_score'].apply(calculate_sentiment)

    # Convert 'Date' column to datetime type in both dataframes
    df_news['Date'] = pd.to_datetime(df_news['Date'])
    df_price['Date'] = pd.to_datetime(df_price['Date'])

    # Perform a left outer join based on the 'Date' column
    merged_df = pd.merge(df_price, df_news, on='Date', how='left')

    # Fill NaN values with 0
    merged_df.fillna(0, inplace=True)

    # Drop duplicate rows
    merged_df.drop_duplicates(inplace=True)

    # Reset the index
    merged_df.reset_index(drop=True, inplace=True)

    # Convert 'sentiment_score' column to integer
    merged_df['sentiment_score'] = merged_df['sentiment_score'].astype(int)

    # Set 'Date' column as the index
    merged_df.set_index('Date', inplace=True)

    return merged_df