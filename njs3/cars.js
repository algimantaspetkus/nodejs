const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const cars = [];

app.get("/cars", (req, res) => {
    res.json(cars.map((car, index) => ({ index, ...car })));
});

app.post("/cars", (req, res) => {
    const car = req.body;
    if (car.brand) {
        cars.push(car);
        res.json(car);
    } else {
        res.send({ error: "Brand not defined" });
    }
});

app.delete("/cars/:index", (req, res) => {
    const index = req.params.index;
    const car = { index, ...(cars[index] ? cars[index] : { error: "No car with this index" }) };
    cars.splice(index, 1);
    res.json(car);
});

app.listen(3000);
