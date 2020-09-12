const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    repeat: {
        monday: {
            type: Boolean,
            required: true
        },
        tuesday: {
            type: Boolean,
            required: true
        },
        wednesday: {
            type: Boolean,
            required: true
        },
        thursday: {
            type: Boolean,
            required: true
        },
        friday: {
            type: Boolean,
            required: true
        },
        saturday: {
            type: Boolean,
            required: true
        },
        sunday: {
            type: Boolean,
            required: true
        }
    },
    remindTime: {
        type: Number,
        required: true
    }
})

mongoose.model('Habit', habitSchema); 