const { Kafka } = require('kafkajs');
const kafkaConfig = require('./kafka-config');

const kafka = new Kafka(kafkaConfig.producer);
const producer = kafka.producer();

// Connect to Kafka
async function connectKafka() {
    try {
        await producer.connect();
        console.log('Connected to Kafka with clientId:', kafkaConfig.producer.clientId);
    } catch (error) {
        console.error('Error connecting to Kafka:', error);
        throw error;
    }
}

// Send message to Kafka
async function sendMessage(topic, message) {
    try {
        await producer.send({
            topic,
            messages: [
                { 
                    key: Date.now().toString(),
                    value: JSON.stringify(message)
                }
            ]
        });
        console.log(`Message sent to topic ${topic}:`, message);
    } catch (error) {
        console.error('Error sending message to Kafka:', error);
        throw error;
    }
}

// Send reminder message
async function sendReminder(reminderData) {
    const message = {
        type: 'REMINDER',
        data: reminderData,
        timestamp: new Date().toISOString()
    };
    await sendMessage(kafkaConfig.topics.reminders, message);
}

// Send notification
async function sendNotification(notificationData) {
    const message = {
        type: 'NOTIFICATION',
        data: notificationData,
        timestamp: new Date().toISOString()
    };
    await sendMessage(kafkaConfig.topics.notifications, message);
}

// Disconnect from Kafka
async function disconnectKafka() {
    try {
        await producer.disconnect();
        console.log('Disconnected from Kafka');
    } catch (error) {
        console.error('Error disconnecting from Kafka:', error);
        throw error;
    }
}

module.exports = {
    connectKafka,
    sendMessage,
    sendReminder,
    sendNotification,
    disconnectKafka
}; 