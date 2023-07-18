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
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    process.exit(0);
});
//# sourceMappingURL=db.helper.js.map