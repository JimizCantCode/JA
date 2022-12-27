const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require('dotenv').config();

function main() {
    const app = new express();

    app.get("/", (request, response) => {
        response.send("hello")
    });

    app.get("/api/player/:id", (request, response) => {
        response.send(request.params.id);
    });

    app.use((request, response, next) => {
        const auth = {login: 'admin', password: process.env.ExpressPassword};
        const b64auth = (request.headers.authorization || '').split(' ')[1] || ''
        const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':')
        if (login && password && login === auth.login && password === auth.password) {
          return next()
        }
        response.set('WWW-Authenticate', 'Basic realm="401"')
        response.status(401).send('Authentication required.')
    });

    require("./Schema/pendVerify-schema");
    const pendingVerifyModel = mongoose.model("Pending Verification");

    app.get("/api/verifying/:DiscordID/:RobloxID", async (request, response) => {
        async function SaveData() {
            const User = await pendingVerifyModel.findOne({ DiscordID: request.params.DiscordID });

            if (User) {
                return User;
            } else {
                const newUser = new pendingVerifyModel({ DiscordID: request.params.DiscordID, RobloxID: request.params.RobloxID });
                await newUser.save();
                return User;
            }

        }
        response.json(await SaveData());
    });

    app.listen(process.env.Port, () => console.log("Express listening on: localhost:" + process.env.Port))
}

module.exports = { main };