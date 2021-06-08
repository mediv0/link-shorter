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

const ITEMS_PER_PAGE = 10;
module.exports.getLink = async (req, res, next) => {
    const { page } = req.query;
    if (req.session.userId) {
        const links = await Url.find({ creator: req.session.userId })
            .select("-_id -__v -creator")
            .skip((page - 1) * ITEMS_PER_PAGE)
            .limit(ITEMS_PER_PAGE)
            .exec();
        res.status(200).send({ list: links });
    } else {
        next(new ErrorHandler(500, "something went wrong..."));
    }
};

function hasUserRefrence(id) {
    return mongoose.isValidObjectId(id) ? id : false;
}
