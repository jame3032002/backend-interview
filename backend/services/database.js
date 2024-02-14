const mongoose = require("mongoose");

function connectionDatabase() {
  mongoose.connect(process.env.MONGO_SERVER);
  const db = mongoose.connection;

  db.on("error", () => {
    console.log("Database error!");
  });

  db.once("open", () => {
    console.log("Database connection");
  });
}

module.exports = {
  connectionDatabase,
};
