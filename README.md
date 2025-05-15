# Reminder BullMQ with Kafka Integration

This is a job queue system using BullMQ and Kafka, demonstrating how to implement distributed job processing and real-time messaging in Node.js.

## Overview

The app consists of several main components:
- `producer.js`: Adds jobs to BullMQ queue
- `worker.js`: Processes jobs from BullMQ queue
- `kafka-producer.js`: Sends messages to Kafka topics
- `kafka-consumer.js`: Consumes messages from Kafka topics
- `kafka-config.js`: Centralized Kafka configuration

## Features

### BullMQ Features
- **Repeating Jobs**: Demonstrates how to add jobs that repeat at specified intervals
- **Redis Integration**: Uses Redis as a backend for job management
- **Event Handling**: Logs job completion and failure events

### Kafka Features
- **Real-time Messaging**: Asynchronous message processing
- **Topic-based Communication**: Separate topics for reminders and notifications
- **Consumer Groups**: Support for parallel processing
- **Configurable Settings**: Environment-based configuration

## Dependencies

- BullMQ
- Redis
- KafkaJS
- Express
- Other utility libraries (moment, dotenv, etc.)

## Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
# Kafka Configuration
KAFKA_BROKERS=localhost:9092
KAFKA_CLIENT_ID=reminder-app
KAFKA_CONSUMER_GROUP=reminder-group
KAFKA_TOPIC_REMINDERS=reminders
KAFKA_TOPIC_NOTIFICATIONS=notifications
```

## How to Run

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the BullMQ worker:
   ```bash
   npm start
   ```

3. Start the Kafka consumer:
   ```bash
   npm run start:kafka
   ```

4. Debug the app:
   ```bash
   npm run debug
   ```

## How It Works

### BullMQ Implementation
- **producer.js** adds a repeating job to the queue (every 5 seconds)
- **worker.js** listens for jobs on the queue and processes them
- The system uses Redis as a backend to manage the queue

### Kafka Implementation
- **kafka-producer.js** sends messages to Kafka topics
- **kafka-consumer.js** consumes messages from Kafka topics
- Messages are processed based on their type (REMINDER, NOTIFICATION)

## Redis Keys

BullMQ uses Redis to store job data. For the `myQueue` queue, the keys typically include:
- `myQueue:active`: A list of jobs currently being processed
- `myQueue:waiting`: A list of jobs waiting to be processed
- `myQueue:completed`: A list of completed jobs
- `myQueue:failed`: A list of failed jobs
- `myQueue:delayed`: A list of jobs scheduled for future processing
- `myQueue:paused`: A list of paused jobs
- `myQueue:meta`: Metadata about the queue
- `myQueue:events`: A stream of events related to the queue

## Kafka Topics

The application uses the following Kafka topics:
- `reminders`: For reminder-related messages
- `notifications`: For notification-related messages

## Usage Examples

### Sending a Reminder
```javascript
const { sendReminder } = require('./kafka-producer');

await sendReminder({
    userId: '123',
    message: 'Take your medicine',
    time: new Date().toISOString()
});
```

### Processing Messages
```javascript
const { connectKafka, subscribeToTopics, processMessages } = require('./kafka-consumer');

await connectKafka();
await subscribeToTopics(['reminders', 'notifications']);
await processMessages();
```

## Monitoring

### BullMQ Monitoring
- Check Redis keys for job status
- Monitor worker logs for job processing

### Kafka Monitoring
- Use Kafka's built-in tools to monitor topics
- Check consumer group status
- Monitor message processing through application logs

## License

ISC
```

</rewritten_file>