import time
import os
import tensorflow as tf

# Training the agent for a single stock symbol
def train_agent(agent, env, total_episodes, episodes_per_batch, weights_directory, ticker_symbol):

    print("RL AGENT TRAINING STARTED")

    for batch in range(total_episodes // episodes_per_batch):
        start_time = time.time()
        
        for episode in range(episodes_per_batch):
            state = env.reset()
            total_reward = 0

            for _ in range(episodes_per_batch):
                action = agent.choose_action(state)
                next_state, reward, done, _ = env.step(action)
                agent.train(state, action, reward, next_state)
                total_reward += reward
                state = next_state

                if done:
                    break

        # Save the agent's model weights after each batch of episodes
        weights_filename = os.path.join(weights_directory, f'{ticker_symbol}.h5')
        agent.q_network.save_weights(weights_filename)

        # Pause for 5 minutes between training each agent
        if batch < total_episodes // episodes_per_batch - 1:
            print(f'Pausing for 1 minutes between training agents for {ticker_symbol}...')
            time.sleep(60)  # 1 minutes

        # Optionally release resources
        tf.keras.backend.clear_session()