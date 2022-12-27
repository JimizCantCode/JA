const mongoose = require("mongoose");

const PendingVerify = new mongoose.Schema({
    RobloxID: {
        type: Number,
        require: true,
    },
    DiscordID: {
        type: Number,
        require: true,
    },
});

const PendVerify = mongoose.model("Pending Verification", PendingVerify)