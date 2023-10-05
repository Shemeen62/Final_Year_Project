from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from ARIMA.arima_predictions import arima_predicted_results
from LSTM.lstm_predictions import lstm_predicted_results
from RL_Agent.rl_predictions import rl_agent_predicted_results
from predict_stocks import weighted_average_predictions

app = Flask(__name__)
api = Api(app)

# Define a route for the root URL ("/")
@app.route('/')
def index():
    # You can return an HTML template or a welcome message here
    return "Welcome to your Flask app!"

class StockPredictions(Resource):
    def post(self):
        data = request.get_json()
        stock_symbol = data['stock_symbol']
        num_days = data['num_days']

        # Log or print the received data for verification
        print(f"Received data: stock_symbol={stock_symbol}, num_days={num_days}")

        # Call your prediction functions here and get the results
        arima_predictions = arima_predicted_results(stock_symbol, num_days)
        lstm_predictions = lstm_predicted_results(stock_symbol, num_days)
        rl_predictions = rl_agent_predicted_results(stock_symbol, num_days)

        # Calculate the weighted average
        final_dates, final_predictions, final_predictions_dict = weighted_average_predictions(
            arima_predictions, lstm_predictions, rl_predictions
        )

        # Return the predictions as JSON
        return jsonify(final_predictions_dict)

api.add_resource(StockPredictions, '/predict')

if __name__ == "__main__":
    app.run(debug=True)
