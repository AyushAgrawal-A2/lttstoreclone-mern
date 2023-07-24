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
        isValidPassword(password) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    return yield bcrypt.compare(password, this.password);
                }
                catch (error) {
                    throw error;
                }
            });
        },
    },
});
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            this.password = yield bcrypt.hash(this.password, 10);
            next();
        }
        catch (error) {
            next(error);
        }
    });
});
export default mongoose.model('user', userSchema);
//# sourceMappingURL=user.model.js.map