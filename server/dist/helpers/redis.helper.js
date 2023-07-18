import { createClient } from 'redis';
const redisClient = createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: 'redis-16188.c305.ap-south-1-1.ec2.cloud.redislabs.com',
        port: 16188,
    },
});
redisClient
    .connect()
    .then(() => {
    console.log('Redis connected');
})
    .catch((error) => {
    console.error(error);
    process.exit(1);
});
redisClient.on('error', (err) => {
    console.log(err.message);
    process.exit(1);
});
redisClient.on('end', () => {
    console.log('Redis disconnected');
});
process.on('SIGINT', async () => {
    await redisClient.quit();
    process.exit(0);
});
export default redisClient;
//# sourceMappingURL=redis.helper.js.map