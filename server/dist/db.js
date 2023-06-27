var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose from 'mongoose';
mongoose
    .connect(process.env.mongoURI)
    .then(() => {
    console.log('Database connected');
})
    .catch((error) => {
    console.error(error);
    process.exit(1);
});
mongoose.connection.on('error', (err) => {
    console.log(err.message);
    process.exit(1);
});
mongoose.connection.on('disconnected', () => {
    console.log('Database disconnected');
});
process.on('SIGINT', () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose.connection.close();
    process.exit(0);
}));
//# sourceMappingURL=db.js.map