from ARIMA.arima_predictions import arima_predicted_results
from LSTM.lstm_predictions import lstm_predicted_results
from RL_Agent.rl_predictions import rl_agent_predicted_results
import matplotlib.pyplot as plt

def weighted_average_predictions(arima_predictions, lstm_predictions, rl_agent_predictions, weights=[0.7, 0.2, 0.1]):
    final_predictions_dict = {}
    final_dates = []
    final_predictions = []

    # Check if the dictionaries have the same keys (dates)
    if set(arima_predictions.keys()) != set(lstm_predictions.keys()) != set(rl_agent_predictions.keys()):
        raise ValueError("Prediction dictionaries have different keys.")

    for date in arima_predictions.keys():
        arima_pred = arima_predictions[date]
        lstm_pred = lstm_predictions[date]
        rl_agent_pred = rl_agent_predictions[date]

        # Calculate the weighted average
        weighted_avg = (weights[0] * arima_pred + weights[1] * lstm_pred + weights[2] * rl_agent_pred)

        final_predictions_dict[date] = weighted_avg

        final_dates.append(date)
        final_predictions.append(weighted_avg)

    return final_dates, final_predictions, final_predictions_dict



if __name__ == "__main__":

    stock_symbol = "AAPL"
    number_of_days = 7
    normal_path = "/"
    dataset_path = "Dataset"

    arima_predictions = arima_predicted_results(normal_path, dataset_path, stock_symbol, number_of_days)
    lstm_predictions = lstm_predicted_results(normal_path, dataset_path, stock_symbol, number_of_days)
    rl_predictions = rl_agent_predicted_results(normal_path, dataset_path, stock_symbol, number_of_days)
    print(arima_predictions)
    print(lstm_predictions)
    print(rl_predictions)


    future_dates, future_predictions, final_predictions_dict  = weighted_average_predictions(arima_predictions, lstm_predictions, rl_predictions)
    print("Final Prediction : ",final_predictions_dict)