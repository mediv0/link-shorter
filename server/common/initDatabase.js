const mongoose = require("mongoose");

module.exports = function () {
    mongoose.connect(
        process.env.DB_URL,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: true,
        },
        () => {
            console.log("mongodb connected...");
        }
    );
};
