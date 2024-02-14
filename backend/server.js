const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");

const { connectionDatabase } = require("./services/database");

const PORT = process.env.PORT || 2000;
const app = express();

// Connect Database
connectionDatabase();

// middlewares
app.use(cors());
app.use(bodyParser.json({ type: "application/json" }));

app.use("/api/users", require("./routes/users"));
app.use("/api/interviews", require("./routes/interviews"));
app.use("/api/comments", require("./routes/comments"));

app.listen(PORT, () => {
  console.log(`Running on port: ${PORT}`);
});
