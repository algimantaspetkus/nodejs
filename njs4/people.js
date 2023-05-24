const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const cors = require("cors");

const data = JSON.parse(fs.readFileSync(path.join(__dirname, "data.json"), "utf-8"));
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.get("/data/car/:make", (req, res) => {
    const make = req.params.make;
    const filtered = data.filter((car) => car.car.toLowerCase() === make.toLowerCase());
    res.json(filtered);
});

app.get("/data/cars", (req, res) => {
    const cars = [...new Set(data.map((car) => car.car))].sort();
    res.json(cars);
});

app.get("/data/user/:id", (req, res) => {
    const id = +req.params.id;
    const filtered = data.filter((user) => user.id === id);
    res.json(filtered);
});

app.get("/data/users/:gender", (req, res) => {
    const gender = req.params.gender;
    const filtered = data.filter((user) => user.gender.toLowerCase() === gender.toLowerCase());
    res.json(filtered);
});

app.get("/data/genders", (req, res) => {
    const genders = [...new Set(data.map((user) => user.gender))].sort();
    res.json(genders);
});

app.get("/data/emails", (req, res) => {
    const emails = data.map((user) => user.email);
    res.json(emails);
});

app.get("/data", (req, res) => {
    res.json(data);
});

app.listen(3000);
