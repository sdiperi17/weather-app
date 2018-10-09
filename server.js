var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var path = require("path");
var axios = require("axios");

app.use(express.static(path.join(__dirname, "public")));
// whatever data comes from json parse it and put it on body object example: req.body
app.use(bodyParser.json());
// turn it from string/urlencoded into regular json code
app.use(bodyParser.urlencoded({ extended: false }));
// set view engine to ejs
app.set("view engine", "ejs");

var server = app.listen(3000, () => {
    console.log("running");
});

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/weather-forecast", (req, res) => {
    res.render("new-page");
});

app.post("/weather-forecast", (req, res) => {
    var zipcode = req.body.zipcode;
    console.log(req.body.zipcode);
    axios
        .get(
            `http://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&APPID=5ff3c2d31df65ddb5baf09addb40c4d7`
        )
        .then(function(data) {
            console.log(data[0]);
            res.render("new-page");
        });
});
