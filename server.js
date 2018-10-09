var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var path = require("path");

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
