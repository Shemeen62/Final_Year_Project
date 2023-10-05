import os
import time
from Data_Preprocessing.RL_Agent_Preprocess import RL_Agent_Preprocess
from RL_Agent.stock_price_env import StockPriceEnv
from RL_Agent.q_learning_agent import QLearningAgent
from RL_Agent.training_agent import train_agent
import pandas as pd

def rl_agent_train(symbols, start_date):
    # Define a list of stock symbols
    ticker_symbols = symbols  # Replace with your list of stock symbols

    # Directory to save agent models
    weights_directory = "trained_rl_agent_models"
    os.makedirs(weights_directory, exist_ok=True)  # Create the directory if it doesn't exist

    # Directory containing CSV files
    dataset_directory = "Datasets"

    # Create dictionaries to store agents and environments for each stock symbol
    agent_dict = {}
    env_dict = {}

    # Load data from DataFrames for each stock symbol
    filtered_data = RL_Agent_Preprocess(ticker_symbols, pd.to_datetime(start_date))

    for ticker_symbol in ticker_symbols:
        # Fetch historical stock prices from DataFrames
        historical_prices = filtered_data[ticker_symbol]['Close'].values.tolist()

        # Create a generalized environment for each stock symbol
        env = StockPriceEnv(historical_prices)
        env_dict[ticker_symbol] = env

        # Create a Q-learning agent for each stock symbol
        num_actions = 21  # Number of discrete actions
        agent = QLearningAgent(num_actions, exploration_prob=0.5)  # Increase exploration probability
        agent_dict[ticker_symbol] = agent

        # Train agents for each stock symbol
        total_episodes = 1000  # Total number of episodes to train
        episodes_per_batch = 50  # Number of episodes per batch

        train_agent(agent_dict[ticker_symbol], env_dict[ticker_symbol], total_episodes, episodes_per_batch, weights_directory, ticker_symbol, filtered_data[ticker_symbol])

        # Pause for 5 minutes between training each agent
        if ticker_symbol != ticker_symbols[-1]:
            print(f'Pausing for 5 minutes before training the next agent...')
            time.sleep(300)  # 5 minutes

    print("Training process completed for all agents.")
