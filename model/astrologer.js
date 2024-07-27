const mongoose = require('mongoose');   


const astrologerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    experience: {
        type: Number,
        required: true
    },
    languages: {
        type: [String],
        required: true
    },
    experties: {
        type: [String],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Number,
        default: Date.now()
    },
});

const Astrologer = mongoose.model('Astrologer', astrologerSchema);
module.exports = Astrologer;