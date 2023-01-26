var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var authUser = require('./authUser.js');

var entrySchema = new mongoose.Schema({
    user: mongoose.Schema.Types.ObjectId,
    type: String,
    additional: Object,
    date: {type: Date, default: Date.now},
});

router.post('/entry', authUser, async (req, res) => {
    console.log(req.body, req.session.userInfo.id);
    
    var entries = mongoose.model('Entry', entrySchema);  // Get database

    // No duplicate entry for mood
    // if slept is higher than woke, then slept is day before
    // if slept is lower than woke, then slept is same day
    
    var selectedDate = new Date();
    selectedDate.setDate(selectedDate.getDate() - req.body.date);

    start = new Date(selectedDate.setUTCHours(0, 0, 0, 0));
    end = new Date(selectedDate.setUTCHours(23, 59, 59, 999));
    
    // Mood verification
    if (req.body.type == "Mood") {
        var doc = await entries.find({
            user: req.session.userInfo.id,
            type: 'Mood',
        })
        doc = doc.filter(entry => (entry.date >= start && entry.date <= end))
        if (doc.length > 0) {
            console.log("Entered already")
            res.status(201).send({message: "Mood already added for the day"});
            return;
        }
    }

    var id = new mongoose.Types.ObjectId();
    var entry = await entries.create({
        _id: id,
        user: req.session.userInfo.id,
        type: req.body.type,
        additional: req.body.additional,
        date: selectedDate,
    })
    console.log(entry)

    res.status(200).send({});
})

router.post('/get', authUser, async (req, res) => {
    console.log(req.body, req.session.userInfo.id);

    var currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - req.body.date)
    start = new Date(currentDate.setUTCHours(0, 0, 0, 0));
    end = new Date(currentDate.setUTCHours(23, 59, 59, 999));
    console.log(currentDate, start, end)

    var entries = mongoose.model('Entry', entrySchema);  // Get database
    var docs =  await entries.find({
        user: req.session.userInfo.id,
    })
    docs = docs.filter(doc => (doc.date >= start && doc.date <= end))
    console.log(docs)
    res.status(200).send({entries: docs});
})

module.exports = router;