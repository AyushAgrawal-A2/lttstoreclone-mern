import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        default: '',
    },
    address: {
        type: String,
        default: 'United States',
    },
    accountType: {
        type: String,
        default: 'customer',
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true,
    },
}, {
    methods: {
        async isValidPassword(password) {
            try {
                return await bcrypt.compare(password, this.password);
            }
            catch (error) {
                throw error;
            }
        },
    },
});
userSchema.pre('save', async function (next) {
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    }
    catch (error) {
        next(error);
    }
});
export default mongoose.model('user', userSchema);
//# sourceMappingURL=user.model.js.map