const mongoose = require("mongoose");

const UrlSchema = new mongoose.Schema({
    orginal: {
        type: String,
        required: true,
    },
    short: {
        type: String,
        required: true,
    },
    creator: {
        type: String,
        required: false,
    },
});

const Url = mongoose.model("urls", UrlSchema);

module.exports = Url;
