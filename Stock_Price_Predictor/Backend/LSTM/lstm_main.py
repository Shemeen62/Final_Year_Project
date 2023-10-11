from Data_Preprocessing.LSTM_Preprocess import preprocess_stock_data
from LSTM.lstm_model import train_lstm_model

def lstm_train(symbols, start_date, dataset_path):

    stock_symbols = symbols  # Add more stock symbols as needed
    for tk in stock_symbols:
        processed_df = preprocess_stock_data(tk, dataset_path)
        train_lstm_model(processed_df, tk)
    
    print("LSTM Training process completed.")