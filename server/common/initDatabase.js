const mongoose = require("mongoose");

module.exports = async function () {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: true,
            useCreateIndex: true,
        });

        console.log("mongodb connected...");
    } catch (err) {
        console.log("Failed to connect to MongoDB", err);
    }
};
