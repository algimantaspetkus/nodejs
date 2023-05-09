const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

let people = [];

app.get("/people", (req, res) => {
    res.json(people.map((person, index) => ({ index, ...person })));
});

app.post("/people", (req, res) => {
    const person = req.body;
    people.push(person);
    res.json({ status: "ok" });
});

app.delete("/people/:index", (req, res) => {
    const index = req.params.index;
    people = people.filter((person, i) => i != index);
    res.json({ status: "ok" });
});

app.listen(3000);
