const express = require("./Backend/express").main;

express();

process.on("SIGINT", () => {
    console.log("Shutting off!")
    process.exit(0);
});