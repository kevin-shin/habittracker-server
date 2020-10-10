const express = require('express');
const mongoose = require('mongoose');
const DiaryEntry = mongoose.model('DiaryEntry');

const router = express.Router();

// GET
router.get('/entry', async (req, res) => {
    const filterConditions = req.query;
    let entries = [];

    entries = await DiaryEntry
        .find(filterConditions)
        .populate({
            path: 'entry',
            populate: { path: 'habit' }
        });
    res.status(200).send(entries);
});

// POST
router.post('/entry', async (req, res) => {
    let { year, month, day, entry } = req.body;

    if (!year || !month || !day || !entry) {
        return res.status(422)
            .send({ error: "Missing fields." });
    }

    try {
        const newEntry = new DiaryEntry({ year, month, day, entry });
        await newEntry.save();
        let newEntryPopulated = await newEntry.populate({
            path: 'entry',
            populate: { path: 'habit' }
        }).execPopulate();
        res.status(201).json(newEntryPopulated);
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