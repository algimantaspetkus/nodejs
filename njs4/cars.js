const express = require("express");
const app = express();

const cars = {
    bmw: ["i3", "i8", "1 series", "3 series", "5 series"],
    mb: ["A class", "C class", "E class", "S class"],
    vw: ["Golf", "Arteon", "UP"],
};

app.get("/cars/:brand", (req, res) => {
    const brand = req.params.brand;
    res.send(cars[brand]);
});
app.listen(3000);
