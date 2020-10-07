const express = require('express');
const mongoose = require('mongoose');
const DiaryEntry = mongoose.model('DiaryEntry');

const router = express.Router();

// GET
router.get('/entry', async (req, res) => {
    const { month, year } = req.params;
    let entries = [];

    if (year && month) {
        entries = await DiaryEntry
            .find({ month, year })
            .populate({
                path: 'entry',
                populate: { path: 'habit' }
            });
    }
    else {
        entries = await DiaryEntry
            .find({})
            .populate({
                path: 'entry',
                populate: { path: 'habit' }
            });
    }

    res.status(200).send(entries);
});

router.get('/entry/today', async (req, res) => {
    const today = new Date();
    const entry = await DiaryEntry.find({
        date: {
            $gte: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0),
            $lte: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59)
        }
    }).populate({
        path: 'entry',
        populate: { path: 'habit' }
    });

    res.status(200).send(entry);
});

// POST
router.post('/entry', async (req, res) => {
    let { date, entry } = req.body;

    if (!date || !entry) {
        return res.status(422)
            .send({ error: "Missing fields." });
    }

    try {
        const newEntry = new DiaryEntry({ date, entry });
        await newEntry.save();
        let newEntryPopulated = await newEntry.populate({
            path: 'entry',
            populate: { path: 'habit' }
        }).execPopulate();
        res.status(201).json(newEntry);
    } catch (e) {
        res.status(422).send({ error: e });
    }
})

// UPDATE 
router.put('/entry', async (req, res) => {
    const { id, entry } = req.body;
    if (!id || !entry) {
        return res.status(422)
            .send({ error: "Missing fields." });
    }
    const update = { entry };
    try {
        const updatedEntry = await DiaryEntry.findOneAndUpdate({ _id: id }, update, { new: true });
        res.status(201).json(updatedEntry.entry);
    } catch (e) {
        console.log(e);
        res.status(422).send({ error: "Encountered error with PUT" });
    }

});

// DELETE
router.delete('/entry', async (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.status(422)
            .send({ error: "Missing fields." });
    }

    try {
        await DiaryEntry.findByIdAndDelete(id);
        res.status(200).send({ message: "Delete successful" });
    } catch (e) {
        res.status(422).send({ error: "Encountered error with DELETE" });
    }
})

module.exports = router;