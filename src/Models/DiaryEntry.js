const mongoose = require('mongoose');

const habitEntrySchema = new mongoose.Schema({
    habit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Habit'
    },
    done: Boolean,
    notes: String
});

const diaryEntrySchema = new mongoose.Schema({
    day: {
        type: Number,
        required: true
    },
    month: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    entry: {
        type: [habitEntrySchema],
        required: true
    },
    numerator: Number,
    denominator: Number
})

mongoose.model('DiaryEntry', diaryEntrySchema);