module.exports = function (logger) {
    return function (err, req, res, next) {
        logger.log("error", err);
        err && res.status(500).send("something is wrong...");
    };
};
