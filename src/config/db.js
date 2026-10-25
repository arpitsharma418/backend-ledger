const mongoose = require("mongoose");

async function connectToDb(){
      await mongoose.connect(process.env.MONGO_URI)
      .then(() => {
            console.log("Server is connected to DB")
      })
      .catch((err) => {
            console.log("Error in connecting to DB", err);
            process.exit(1);
      })
};

module.exports = connectToDb;