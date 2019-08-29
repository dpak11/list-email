/*jshint esversion: 6*/

const express = require("express");
const app = express();

const http = require('http').Server(app);
const port = process.env.PORT || 3000;


app.use(express.static(__dirname + "/public"));



app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/main.html");

});



http.listen(port, () => {
    console.log(`Server running at port ` + port);
});