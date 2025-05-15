const { Queue } = require("bullmq");

const redisOptions = {
    host: "elch-digi-dev-nvir.rgk8jq.ng.0001.use1.cache.amazonaws.com",
    port: 9200
};

const myQueue = new Queue("myQueue", { connection: redisOptions });

async function addJob(job) {
    const options = { repeat: { every: 5000 } };
    const addedJob = await myQueue.add(job.name, job, options);
    console.log(`Job added to queue: ${addedJob.id}`);
    return addedJob;
}

const welcomeMessage = () => {
    console.log("Sending a welcome message every 5 seconds");
};

(async () => {
    try {
        await addJob({ name: 'welcomeMessage' });
    } catch (error) {
        console.error("Error adding job:", error);
    }
})();

module.exports = {
    redisOptions,
    welcomeMessage,
    addJob
}