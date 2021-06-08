const { ErrorHandler } = require("../controllers/error");

module.exports = (req, res, next) => {
    if (req.session.isAuth && req.session.userId) {
        next();
    } else {
        next(new ErrorHandler(403, "your not authorized."));
    }
};
