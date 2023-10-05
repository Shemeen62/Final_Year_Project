import os  # Added for directory handling
import numpy as np
from Data_Preprocessing.ARIMA_Preprocess import ARIMA_and_RL_Agent_Preprocess as preprocess
from RL_Agent.q_learning_agent import QLearningAgent
from RL_Agent.stock_price_env import StockPriceEnv
import pandas as pd

# Load the trained agent for prediction
def load_trained_agent(agent, weights_filename):
    agent.q_network.load_weights(weights_filename)

# Function to load a saved RL agent model and make future predictions
def make_future_predictions(stock_ticker, num_days, weights_directory):
    # Load the saved RL agent model for the chosen stock
    weights_filename = os.path.join(weights_directory, f'{stock_ticker}.h5')
    
    # Check if the agent model file exists
    if not os.path.exists(weights_filename):
        print(f"No trained agent model found for {stock_ticker}. Please train the agent first.")
        return None

    # Create the Q-learning agent
    num_actions = 21  # Number of discrete actions
    agent = QLearningAgent(num_actions, exploration_prob=0.1)  # Set the exploration probability as needed
    load_trained_agent(agent, weights_filename)

    # Fetch historical data for the chosen stock
    df = preprocess(stock_ticker, '2022-03-01')

    # Determine the last date in the historical data
    last_date = df.index[-1]

    # Generate date range for the next num_days days
    future_dates = pd.date_range(start=last_date + pd.DateOffset(days=1), periods=num_days)

    # Create an environment for prediction
    env = StockPriceEnv(df['Close'].values)

    # Make predictions for the chosen stock for the next num_days days
    future_prices = []

    for _ in range(num_days):
        action = agent.choose_action(env._get_observation())  # Use the environment's observation
        predicted_price = env._get_observation()[0] + action
        future_prices.append(predicted_price)
        state = np.array([predicted_price, env._get_observation()[1] + 1], dtype=np.float32)
        env.current_step += 1

    # Create a dictionary to store the date and predicted price
    predicted_prices = {}

    for i, date in enumerate(future_dates):
        predicted_prices[date.strftime('%Y-%m-%d')] = future_prices[i]

    return predicted_prices

def rl_agent_predicted_results(stock_symbol, number_of_days):
    weights_directory = "trained_rl_agent_models"

    user_ticker = stock_symbol
    user_days = number_of_days
    # user_ticker = input("Enter a stock ticker (e.g., AAPL, MSFT, ORCL): ")
    # user_days = int(input("Enter the number of future days for prediction: "))

    predictions = make_future_predictions(user_ticker, user_days, weights_directory)

    print("------------------RL AGENT--------------------")

    if predictions:
        # Print the predicted prices
        for date, price in predictions.items():
            print(f"Date: {date}, Predicted Price: {price}")

    return predictions
