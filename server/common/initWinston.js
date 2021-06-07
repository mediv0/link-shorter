import { createLogger, format, transports } from "winston";
const { combine, timestamp, prettyPrint, errors, metadata } = format;

module.exports = function () {
    const logger = createLogger({
        format: combine(errors({ stack: true }), metadata(), timestamp(), prettyPrint()),
        transports: [new transports.File({ filename: "errors.log" })],
    });

    return logger;
};
