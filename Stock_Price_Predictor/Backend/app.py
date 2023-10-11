from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from ARIMA.arima_predictions import arima_predicted_results
from LSTM.lstm_predictions import lstm_predicted_results
from RL_Agent.rl_predictions import rl_agent_predicted_results
from predict_stocks import weighted_average_predictions
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return "Welcome to your Flask app!"

@app.route('/predict', methods=['POST'])
def predict():

    try:
        data = request.get_json()
        stock_symbol = data['stock_symbol']
        num_days = data['num_days']
        normal_path = ""
        dataset_path = "Datasets"

        # Log or print the received data for verification
        print(f"Received data: stock_symbol={stock_symbol}, num_days={num_days}")

        arima_predictions = arima_predicted_results(normal_path,dataset_path,stock_symbol, int(num_days))
        lstm_predictions = lstm_predicted_results(normal_path,dataset_path,stock_symbol, int(num_days))
        rl_predictions = rl_agent_predicted_results(normal_path,dataset_path,stock_symbol, int(num_days))

        #weights = [arima_weight, LSTM_weight, RL_Agent_weight]
        weights={"AAPL":[0.3, 0.6, 0.1], "MSFT":[0.4, 0.5, 0.1], "ORCL":[0.2, 0.7, 0.1]}

        # Calculate the weighted average
        final_dates, final_predictions, final_predictions_dict = weighted_average_predictions(
            arima_predictions, lstm_predictions, rl_predictions, weights[stock_symbol]
        )

        result = {
            'message': 'Data processed successfully',
            'stock_symbol': stock_symbol,
            'num_days': num_days,
            'final_dates' : final_dates,
            'final_predictions' : final_predictions,
            'final_dict' : final_predictions_dict
        }

        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)