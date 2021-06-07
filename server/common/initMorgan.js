const fs = require("fs");
const path = require("path");
const morgan = require("morgan");

module.exports = function (app) {
    const accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"));
    app.use(morgan("combined", { stream: accessLogStream }));
};
