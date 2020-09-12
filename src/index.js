
require('./Models/Habits');
require('./Models/DiaryEntry');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const appSettings = require('../appsettings.json');
const habitRoutes = require('./Routes/habitRoutes');
const diaryEntryRoutes = require('./Routes/diaryEntryRoutes');
const fs = require('fs');
const https = require('https');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(habitRoutes);
app.use(diaryEntryRoutes);
app.use(cors());

//MONGO SET UP
const mongoURI = appSettings["MongoConnection"];
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

app.get("/", (req, res) => res.send("hello, world!"))

mongoose.connection.on('connected', () => {
    console.log('Connected to Mongo instance');
});
mongoose.connection.on('error', () => {
    console.error('ERROR');
})

app.listen(3000, () => {
    console.log("...APP STARTED");
})