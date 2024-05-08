import { createClient } from 'redis';

const channelKey = 'channel1';
const redisUrl = 'redis://localhost:6379'; // Replace with your Redis connection URL

// Function to create a separate Redis client with subscription capabilities for a specific channel
const createSubscriber = async (channel) => {
  const subscriber = createClient({ url: redisUrl });
  await subscriber.connect();
  await subscriber.subscribe(channel, (message) => {
    console.log(`Channel '${channel}' subscriber collected message: ${message}`);
  });
  return subscriber;
};

(async () => {
  // Create the publisher client
  const publisher = createClient({ url: redisUrl });
  await publisher.connect();

  // Create a separate subscriber client for channel1
  const channel1Subscriber = await createSubscriber(channelKey);

  // Loop to publish messages on channel1
  for (let i = 0; i < 10; i++) {
    await publisher.publish(channelKey, `channel1_message_${i}`);
    console.log(`Published message on channel1: ${i}`);
  }

  // Close the publisher and subscriber clients
  await publisher.quit();
  await channel1Subscriber.quit();
})();