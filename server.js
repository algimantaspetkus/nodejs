const port = process.argv[2];

const express = require("express");
const app = express();

app.listen(port, () => {
    console.log("Server running on port " + port);
});

app.get("/", (req, res, next) => {
    res.send("Hello World");
});
