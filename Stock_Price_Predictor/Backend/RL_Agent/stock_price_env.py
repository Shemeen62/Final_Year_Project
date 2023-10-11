import gym
import numpy as np

# Define the generalized Gym-like environment for stock price prediction
class StockPriceEnv(gym.Env):
    def __init__(self, historical_prices):
        super(StockPriceEnv, self).__init__()
        self.historical_prices = historical_prices
        self.current_step = 0
        self.max_steps = len(historical_prices) - 1  # Total prediction steps
        self.action_space = gym.spaces.Discrete(21)  # Number of discrete actions
        self.observation_space = gym.spaces.Box(low=0, high=np.inf, shape=(2,), dtype=np.float32)

    def reset(self):
        self.current_step = 0
        return self._get_observation()

    def _get_observation(self):
        return np.array([self.historical_prices[self.current_step], self.current_step], dtype=np.float32)

    def step(self, action):
        current_price = self.historical_prices[self.current_step]
        next_price = self.historical_prices[self.current_step + 1]
        reward = -abs(action - (next_price - current_price))

        self.current_step += 1
        done = self.current_step >= self.max_steps

        return self._get_observation(), reward, done, {}