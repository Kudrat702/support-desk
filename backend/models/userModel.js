const mongoose = require('mongoose') 

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
    },
    phone_no: {
        type: Number,
        required: [true, 'Please add a number'],
        unique: true,
    },

    email: {
        type: String,
        required: [true, 'Please add a email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
}, {
    timestamps: true,
   }
);

module.exports = mongoose.models.User || mongoose.model('User', userSchema);