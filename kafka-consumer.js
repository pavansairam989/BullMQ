const { Kafka } = require('kafkajs');
const kafkaConfig = require('./kafka-config');

const kafka = new Kafka(kafkaConfig.consumer);
const consumer = kafka.consumer({ groupId: kafkaConfig.consumer.groupId });

// Connect to Kafka
async function connectKafka() {
    try {
        await consumer.connect();
        console.log('Consumer connected to Kafka with clientId:', kafkaConfig.consumer.clientId);
    } catch (error) {
        console.error('Error connecting consumer to Kafka:', error);
        throw error;
    }
}

// Subscribe to topics
async function subscribeToTopics(topics) {
    try {
        for (const topic of topics) {
            await consumer.subscribe({ topic, fromBeginning: true });
        }
        console.log(`Subscribed to topics: ${topics.join(', ')}`);
    } catch (error) {
        console.error('Error subscribing to topics:', error);
        throw error;
    }
}

// Process messages
async function processMessages() {
    try {
        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                const value = JSON.parse(message.value.toString());
                console.log(`Received message from topic ${topic}:`, value);

                // Handle different message types
                switch (value.type) {
                    case 'REMINDER':
                        await handleReminder(value.data);
                        break;
                    case 'NOTIFICATION':
                        await handleNotification(value.data);
                        break;
                    default:
                        console.warn(`Unknown message type: ${value.type}`);
                }
            }
        });
    } catch (error) {
        console.error('Error processing messages:', error);
        throw error;
    }
}

// Handle reminder messages
async function handleReminder(data) {
    console.log('Processing reminder:', data);
    // Add your reminder handling logic here
}

// Handle notification messages
async function handleNotification(data) {
    console.log('Processing notification:', data);
    // Add your notification handling logic here
}

// Disconnect from Kafka
async function disconnectKafka() {
    try {
        await consumer.disconnect();
        console.log('Consumer disconnected from Kafka');
    } catch (error) {
        console.error('Error disconnecting consumer from Kafka:', error);
        throw error;
    }
}

module.exports = {
    connectKafka,
    subscribeToTopics,
    processMessages,
    disconnectKafka
}; 