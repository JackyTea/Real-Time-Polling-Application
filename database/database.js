/*
    Real Time Polling Application
    database.js
    Jacky Tea
    19/07/19
*/

//mongoose module
const mongoose = require('mongoose');

//resolve promise chaining issue
mongoose.Promise = global.Promise;

//connection string
const connectionString = "";

//connect to the database
mongoose.connect(connectionString).then((data) => {
    console.log("MongoDB Connected! Details: " + data);
}).catch((errpr) => {
    console.log("An error has occurred while connecting to the databse: "+ error);
});