require('dotenv').config();

const kafkaConfig = {
    // Producer Configuration
    producer: {
        clientId: process.env.KAFKA_CLIENT_ID || 'reminder-app',
        brokers: (process.env.KAFKA_BROKERS || 'localhost:9092').split(','),
        retry: {
            initialRetryTime: 100,
            retries: 8
        }
    },
    
    // Consumer Configuration
    consumer: {
        clientId: `${process.env.KAFKA_CLIENT_ID || 'reminder-app'}-consumer`,
        groupId: process.env.KAFKA_CONSUMER_GROUP || 'reminder-group',
        brokers: (process.env.KAFKA_BROKERS || 'localhost:9092').split(','),
        sessionTimeout: 30000,
        heartbeatInterval: 3000,
        maxBytesPerPartition: 1048576 // 1MB
    },
    
    // Topics
    topics: {
        reminders: process.env.KAFKA_TOPIC_REMINDERS || 'reminders',
        notifications: process.env.KAFKA_TOPIC_NOTIFICATIONS || 'notifications'
    }
};

module.exports = kafkaConfig; 