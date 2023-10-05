import pandas as pd
import numpy as np
import os  # Added import for working with directories
from sklearn.preprocessing import MinMaxScaler
from keras.models import Sequential
from keras.layers import LSTM, Dense, Dropout
import joblib

# Method to train the LSTM model
def train_lstm_model(df, stock_symbol, time_step=100, batch_size=64, epochs=150):
    # Initialize MinMaxScaler for closing prices
    close_scaler = MinMaxScaler(feature_range=(0, 1))

    # Initialize MinMaxScaler for trading volumes
    volume_scaler = MinMaxScaler(feature_range=(0, 1))

    # Initialize MinMaxScaler for sentiment scores
    sentiment_scaler = MinMaxScaler(feature_range=(0, 1))

    # Scale the closing prices, volumes, and sentiment scores separately
    df['Close'] = close_scaler.fit_transform(df['Close'].values.reshape(-1, 1))
    df['Volume'] = volume_scaler.fit_transform(df['Volume'].values.reshape(-1, 1))
    df['sentiment_score'] = sentiment_scaler.fit_transform(df['sentiment_score'].values.reshape(-1, 1))

    def create_dataset(dataset, time_step=1):
        x = []
        y = []
        for i in range(len(dataset) - time_step - 1):
            a = dataset[i:(i + time_step), :]
            x.append(a)
            y.append(dataset[i + time_step, 0])  # Assuming the 'Close' price is in the first column
        x = np.array(x)
        y = np.array(y)
        return x, y

    # Create the Stacked LSTM model
    model = Sequential()
    model.add(LSTM(units=150, return_sequences=True, input_shape=(time_step, 3)))  # 3 features: Close, Volume, sentiment_score
    model.add(Dropout(0.2))
    model.add(LSTM(units=300, return_sequences=True))
    model.add(Dropout(0.4))
    model.add(LSTM(units=500, return_sequences=True))
    model.add(Dropout(0.2))
    model.add(LSTM(units=100))
    model.add(Dropout(0.4))
    model.add(Dense(units=1))  # Output layer for predicting Close prices
    model.compile(loss='mean_squared_error', optimizer='adam')

    # Data preparation
    df_features = df[['Close', 'Volume', 'sentiment_score']].values
    x_train, y_train = create_dataset(df_features, time_step)
    x_train = np.reshape(x_train, (x_train.shape[0], x_train.shape[1], 3))  # 3 features

    # Train the model
    model.fit(x_train, y_train, epochs=epochs, batch_size=batch_size, verbose=1)

    # Create a directory to save the models if it doesn't exist
    save_dir = 'trained_lstm_models_with_sentiment'
    os.makedirs(save_dir, exist_ok=True)

    # Save the trained model and scalers in the directory
    joblib.dump(close_scaler, os.path.join(save_dir, stock_symbol + '_close_scaler.joblib'))
    joblib.dump(volume_scaler, os.path.join(save_dir, stock_symbol + '_volume_scaler.joblib'))
    joblib.dump(sentiment_scaler, os.path.join(save_dir, stock_symbol + '_sentiment_scaler.joblib'))
    model.save(os.path.join(save_dir, stock_symbol + '_stock_prediction_with_volume_sentiment.keras'))