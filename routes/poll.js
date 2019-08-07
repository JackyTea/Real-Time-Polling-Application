/*
    Real Time Polling Application
    poll.js
    Jacky Tea
    19/07/19
*/

//require modules
const express = require("express");
const router = express.Router();
const Vote = require('../schemas/Vote.js');
const Pusher = require('pusher');

//Pusher API setup
const pusher = new Pusher({
    appId: '',
    key: '',
    secret: '',
    cluster: '',
    encrypted: true
});

//poll route GET request for success message
router.get("/", (req, res) => {
    Vote.find().then((votes) => {
        res.json({ success: true, votes : votes });
    }).catch((error) => {
        res.json({ success: false, message : "An error has ocurred: " + error });
    });
});


//poll route POST request to push data to database
router.post("/", (req, res) => {
    //create new vote
    const oneVote = {
        framework: req.body.framework,
        score: 1
    }

    //push new vote
    new Vote(oneVote).save().then((vote) => {
        pusher.trigger('os-framework', 'os-choice', {
            score: parseInt(vote.score),
            framework: vote.framework
        });
        return res.json({ success: true, message: "Thank you for your contribution! Your selection: " + req.body.framework });
    });
});

//make route available
module.exports = router;