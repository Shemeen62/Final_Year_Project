from ARIMA.arima_main import arima_train
from LSTM.lstm_main import lstm_train
from RL_Agent.rl_main import rl_agent_train


if __name__ == "__main__":
    tickers = ["AAPL"]
    start_date = '2022-03-01'

    # arima_train(tickers, start_date)
    # lstm_train(tickers)
    rl_agent_train(tickers, start_date)
