/*
    Real Time Polling Application
    vote.js
    Jacky Tea
    19/07/19
*/

//database model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//model of one vote
const VoteSchema = new Schema({
    framework : {
        type: String,
        required : true
    },
    score : {
        type: String,
        required : true
    }
});

//create collection and add schema
const vote = mongoose.model('Vote', VoteSchema);

//export to other components
module.exports = vote;
