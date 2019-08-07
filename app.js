/*
    Real Time Polling Application
    app.js
    Jacky Tea
    19/07/19
*/

//required modules
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

//create express application
const app = express();
require('./database/database.js');
const poll = require("./routes/poll.js");

//use the "public" folder
app.use(express.static(path.join(__dirname, "public")));

//body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//cors for remote communications
app.use(cors());

//home route
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

//poll route
app.use("/poll", poll);

//404 route
app.use((req, res) => {
    res.status(404).send("Error 404: " + req.hostname + req.url + " could not be found!");
});

//run application on PORT X
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { 
    console.log(`App is now running on port: ${PORT}`); 
});
