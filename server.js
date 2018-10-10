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
            console.log("keys", Object.keys(data.data));
            console.log(data.data.sys.country);
            res.render("new-page", {
                country: data.data.sys.country,
                city: data.data.name,
                date: getDate(),
                tempMin: fahrenheit(data.data.main.temp_min),
                tempMax: fahrenheit(data.data.main.temp_max),
                currentTemp: fahrenheit(data.data.main.temp),
                wind: data.data.wind.speed,
                clouds: data.data.clouds.all,
                humidity: data.data.main.humidity
            });
        });
});

function fahrenheit(kelvin) {
    let fah = Math.round(((kelvin - 273.15) * 9) / 5 + 32);
    return fah;
}

function getDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = "0" + dd;
    }

    if (mm < 10) {
        mm = "0" + mm;
    }

    return (today = mm + "/" + dd + "/" + yyyy);
}
