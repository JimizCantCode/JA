const express       = require("./Backend/express").main;
const mongoose      = require('mongoose');
require('dotenv').config();


mongoose.set('strictQuery', true);
mongoose.connect(process.env.MongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.on('error', console.error.bind("Error occurred: "));
connection.once('open', function() {
  console.log('Connected to MongoDB');
});

express();

process.on("SIGINT", () => {
    connection.close();
    console.log("Shutting off!")
    process.exit(0);
});