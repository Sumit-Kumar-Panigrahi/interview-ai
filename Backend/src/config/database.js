const mongoose = require("mongoose");

async function connectToDB() {
    try {
        console.log(process.env.MONGO_URI); // Temporary check
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to Database");
    } catch (err) {
        console.error(err);
    }
}

module.exports = connectToDB;