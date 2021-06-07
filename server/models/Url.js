const mongoose = require("mongodb");

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
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
    },
});

const Url = mongoose.model("Urls", UrlSchema);

exports.User = Url;
