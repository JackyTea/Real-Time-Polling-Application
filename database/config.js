//...
const mongoose = require("./database.js");

var connectionString = "";

var queryConnection = (function(query) {
    function caller(nestedQuery) {
        query / nestedQuery;
    }
    return {
        add : caller(),
        sub : caller(),
        retrieve : caller()
    }
})();