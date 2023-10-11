from ARIMA.arima_main import arima_train
from LSTM.lstm_main import lstm_train
from RL_Agent.rl_main import rl_agent_train


if __name__ == "__main__":
    tickers = ["ORCL"]
    start_date = '2022-03-01'
    dataset_path = 'Datasets'

    # arima_train(tickers, start_date,dataset_path)
    # lstm_train(tickers,start_date,dataset_path)
    rl_agent_train(tickers, start_date,dataset_path)