var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
process.on('SIGINT', () => __awaiter(void 0, void 0, void 0, function* () {
    yield redisClient.quit();
    process.exit(0);
}));
export default redisClient;
//# sourceMappingURL=redis.helper.js.map