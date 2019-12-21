const express = require("express");
const app = express();
const fetch = require("node-fetch");
const geocoder = require("geocoder");
const cors = require("cors");
const bodyParser = require("body-parser");
const { PythonShell } = require("python-shell");

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Works");
});
app.get("/map_get", (req, res) => {
  fetch(
    `https://apis.mapmyindia.com/advancedmaps/v1/fxs1vleongo2371f3mcb4jsjn21ii73x/route_adv/driving/77.2333,28.6665;77.3178,28.4089?steps=true&alternatives=true`
  )
    .then(res => res.json())
    .then(data => {
      let size = Object.keys(data.routes).length;
      let mainArray = [];
      for (let i = 0; i < size; i++) {
        let tempArray = [];
        for (let j = 0; j < data.routes[i].legs[0].steps.length; j++) {
          tempArray.push(data.routes[i].legs[0].steps[i].maneuver.location);
        }
        mainArray.push(tempArray);
      }
<<<<<<< HEAD
      
      let options = {
        args: latLongArr 
=======
      // res.send(mainArray);
      console.log(mainArray);
      let options = {
        args: mainArray
>>>>>>> f679497aecc75db4e12c8deb269b4035191fc0ec
      };
      PythonShell.run("model.py", options, (err, result) => {
        if (err) {
          throw err;
        }
        res.send(result);
      });
    })
    .catch(err => {
      res.send(err);
    });
});
app.post("/map", (req, res) => {
  const { start_lat, start_long, end_lat, end_long } = req.body;
  console.log(start_lat);

  fetch(
    `https://apis.mapmyindia.com/advancedmaps/v1/fxs1vleongo2371f3mcb4jsjn21ii73x/route_adv/driving/${start_long},${start_lat};${end_lat},${end_long}?steps=true`
  )
    .then(res => res.json())
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.send(err);
    });
});

app.post("/geocode", (req, res) => {
  const { location } = req.body;
  geocoder.geocode(`location`, function(err, data) {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

app.listen(3344, () => {
  console.log("Server started on http://localhost:3344");
});
