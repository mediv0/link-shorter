const mongoose = require("mongoose");

module.exports = async function () {
    await mongoose.connect(
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
