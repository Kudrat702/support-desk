const mongoose = require('mongoose')

const ticketSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    product: {
        type: String,
        enum: ['iPhone', 'MacBook', 'iMac', 'iPad'],
        required: [true, 'Select a product']
    },
    description: {
        type: String,
        required: [true, 'Enter a description of the issue'] 
    },
    status: {
        type: String,
        required: true,
        enum: ['new', 'open', 'closed'],
        default: 'new'
    }

}, {timestamps: true});

module.exports = mongoose.model('Ticket', ticketSchema);