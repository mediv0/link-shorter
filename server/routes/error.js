const { handleError } = require("../controllers/error");

module.exports = function (logger) {
    return function (err, req, res, next) {
        logger.log("error", err);
        err && handleError(err, res);
    };
};
