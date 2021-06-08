const session = require("express-session");
const MongoDBSession = require("connect-mongodb-session")(session);

module.exports = function (app) {
    const sessionStore = new MongoDBSession({
        uri: process.env.DB_URL,
        collection: "sessions",
    });
    app.use(
        session({
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: true,
            cookie: {
                httpOnly: true,
            },
            store: sessionStore,
        })
    );
};
