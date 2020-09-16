const mongoose = require('mongoose');

const habitEntrySchema = new mongoose.Schema({
    habit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Habit'
    },
    complete: Boolean,
    notes: String
});

const diaryEntrySchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    entry: {
        type: [habitEntrySchema],
        required: true
    },
})

mongoose.model('DiaryEntry', diaryEntrySchema);