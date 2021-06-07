const express = require("express");
const helmet = require("helmet");
require("express-async-errors");
require("dotenv").config({ path: `./.env.${process.env.NODE_ENV}` });
const cors = require("cors");

const error = require("./routes/error.js");
const auth = require("./routes/auth.js");

const app = express();

// init configs
require("./common/initDatabase")();
require("./common/initMorgan")(app);
const logger = require("./common/initWinston")();
app.use(cors());
app.use(helmet());

app.use(express.json());
app.use("/auth", auth);
app.use(error(logger));

module.exports = {
    path: "/api",
    handler: app,
};

// Start standalone server if directly running
if (require.main === module) {
    const port = process.env.PORT || 3001;
    app.listen(port, () => {
        // eslint-disable-next-line no-console
        console.log(`API server listening on port ${port}`);
    });
}
