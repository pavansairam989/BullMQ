const { Worker } = require("bullmq");
const { welcomeMessage, redisOptions } = require("./producer");

const jobHandlers = {
    welcomeMessage: welcomeMessage,
};

const processJob = async (job) => {
    const handler = jobHandlers[job.name];

    if (handler) {
        console.log(`Processing job: ${job.name}`);
        await handler(job);
    } else {
        console.warn(`No handler found for job: ${job.name}`);
    }
};

const worker = new Worker("myQueue", processJob, { connection: redisOptions });

worker.on("completed", (job) => {
    console.log(`${job.id} has completed!`);
});

worker.on("failed", (job, err) => {
    console.log(`${job.id} has failed with ${err.message}`);
});

console.log("Worker started!");
