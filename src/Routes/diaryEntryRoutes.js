const express = require('express');
const mongoose = require('mongoose');
const DiaryEntry = mongoose.model('DiaryEntry');

const router = express.Router();

// GET
router.get('/entry', async (req, res) => {
    const { month, year } = req.params;
    let entries = [];

    if (year && month) {
        entries = await DiaryEntry.find({ month, year });
    }
    else {
        entries = await DiaryEntry.find({});
    }
    res.send(entries);
});

router.get('/entry/today', async (req, res) => {
    const today = new Date();
    const entry = await DiaryEntry.find({
        date: {
            $gte: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0),
            $lte: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59)
        }
    });

    res.send(entry);
});

// POST
router.post('/entry', async (req, res) => {
    let { date, entry } = req.body;

    if (!date || !entry) {
        return res.status(422)
            .send({ error: "Missing fields." });
    }

    const dateSplit = date.split("-");
    date = new Date(dateSplit[0], dateSplit[1], dateSplit[2]);

    try {
        const newEntry = new DiaryEntry({ date, entry });
        await newEntry.save();
        res.send(newEntry);
    } catch (e) {
        console.log(e);
        res.status(422).send({ error: e });
    }
})

// UPDATE 
router.put('/entry', async (req, res) => {
    const { date, entry } = req.body;

    if (!date || !entry) {
        return res.status(422)
            .send({ error: "Missing fields." });
    }

    try {
        const updatedEntry = await DiaryEntry.findOneAndUpdate({ date }, { entry }, { new: true });
        updatedEntry.save();
        res.send(updatedEntry);
    } catch (e) {
        res.status(422).send({ error: "Encountered error with PUT" });
    }

});

// DELETE
router.delete('/entry', async (req, res) => {
    const { entry } = req.body;
    if (!entry) {
        return res.status(422)
            .send({ error: "Missing fields." });
    }

    try {
        await DiaryEntry.deleteOne({ entry });
    } catch (e) {
        res.status(422).send({ error: "Encountered error with DELETE" });
    }
})

module.exports = router;