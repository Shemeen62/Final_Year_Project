import tensorflow as tf
import numpy as np

# Define the Q-learning agent using TensorFlow
class QLearningAgent:
    def __init__(self, num_actions, learning_rate=0.1, discount_factor=0.8, exploration_prob=0.1):
        self.num_actions = num_actions
        self.learning_rate = learning_rate
        self.discount_factor = discount_factor
        self.exploration_prob = exploration_prob
        self.q_network = self._build_q_network()
        self.optimizer = tf.keras.optimizers.Adam(learning_rate=self.learning_rate)
    
    def _build_q_network(self):
        model = tf.keras.Sequential([
            tf.keras.layers.Dense(64, activation='relu', input_shape=(2,)),
            tf.keras.layers.Dense(self.num_actions)
        ])
        return model
    
    def choose_action(self, state):
        if np.random.rand() < self.exploration_prob:
            return np.random.choice(self.num_actions)
        else:
            q_values = self.q_network.predict(state.reshape(1, -1))
            return np.argmax(q_values)
    
    def train(self, state, action, reward, next_state):
        with tf.GradientTape() as tape:
            q_values = self.q_network(state.reshape(1, -1))
            target = reward + self.discount_factor * np.max(self.q_network(next_state.reshape(1, -1)))
            target = tf.convert_to_tensor(target, dtype=tf.float32)
            action = tf.convert_to_tensor(action, dtype=tf.int32)
            # Calculate the predicted Q-value for the chosen action
            predicted_q_value = tf.reduce_sum(q_values * tf.one_hot(action, self.num_actions), axis=1)
            loss = tf.keras.losses.mean_squared_error(target, predicted_q_value)
        grads = tape.gradient(loss, self.q_network.trainable_variables)
        self.optimizer.apply_gradients(zip(grads, self.q_network.trainable_variables))