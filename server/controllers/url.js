const mongoose = require("mongoose");
const { customAlphabet } = require("nanoid");
const Url = require("../models/Url");
const { ErrorHandler } = require("../controllers/error");
const { isUrlValid } = require("../common/utils");

module.exports.create = async (req, res, next) => {
    const { url } = req.body;

    try {
        // validate url
        if (!isUrlValid(url)) {
            throw new ErrorHandler(401, "please enter valid url");
        }
        // short url
        const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefgnopqrstuvwxyz";
        const shortenedUrl = customAlphabet(alphabet, 6)();

        // save in db
        await new Url({
            orginal: url,
            short: shortenedUrl,
            creator: hasUserRefrence(req?.session?.userId) || "",
        }).save();

        res.send({ url: shortenedUrl, status: "link created" });
    } catch (error) {
        next(error);
    }
};

module.exports.getLink = async (req, res, next) => {
    // get links for given id
    // check if given id is same as current seasson id ( security )
    // show to user
};

function hasUserRefrence(id) {
    return mongoose.isValidObjectId(id) ? id : false;
}
