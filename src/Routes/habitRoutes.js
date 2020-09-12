const express = require('express');
const mongoose = require('mongoose');
const Habit = mongoose.model('Habit');

const router = express.Router();

// RETRIEVE
router.get('/habit', async (req, res) => {
    const habits = await Habit.find({});
    res.send([habits]);
});

// CREATE
router.post('/habit', async (req, res) => {
    const { name, repeat, remindTime } = req.body;

    if (!name || !repeat || !remindTime) {
        return res.status(422)
            .send({ error: "Missing fields." });
    }

    try {
        const habit = new Habit({ name, repeat, remindTime });
        await habit.save();
        res.send(habit);
    } catch (e) {
        console.log(e);
        res.status(422).send({ error: "Encountered error with POST." });
    }
});

// UPDATE 
router.put('/habit', async (req, res) => {
    const { name, repeat, remindTime } = req.body;

    if (!name || !repeat || !remindTime) {
        return res.status(422)
            .send({ error: "Missing fields." });
    }

    try {
        const habit = new Habit({ name, repeat, remindTime });
        await habit.save();
        res.send(habit);
    } catch (e) {
        res.status(422), send({ error: "Encountered error with POST." });
    }
});

// DELETE 
router.delete('/habit', async (req, res) => {
    const { habit } = req.body;
    if (!habit) {
        return res.status(422)
            .send({ error: "Missing fields." });
    }

    try {
        await Habit.deleteOne({ habit });
    } catch (e) {
        res.status(422).send({ error: "Encountered error with DELETE" });
    }
})


module.exports = router;