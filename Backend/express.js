const express = require('express');
const bodyParser = require("body-parser");
require('dotenv').config();

function main() {
    const app = new express();
    
    app.get("/", (request, response) => {
        response.send("hello")
    });

    app.get("/api/data/:id", (request, response) => {
        response.send(request.params.id)
    });

    app.listen(process.env.Port, () => console.log("Express listening on: localhost:" + process.env.Port))
}

module.exports = {main};