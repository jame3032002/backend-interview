const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const rateLimit = require("express-rate-limit");

const { connectionDatabase } = require("./services/database");
const { RATE_LIMIT_REQUEST_PER_TIME_RESET } = require("./config");

const PORT = process.env.PORT || 2000;
const app = express();

// Connect Database
connectionDatabase();

// Rate Limit Config
const limiter = rateLimit({
  windowMs: RATE_LIMIT_REQUEST_PER_TIME_RESET * 1000,
  max: RATE_LIMIT_REQUEST_PER_TIME_RESET,
  message: "Too many requests from this IP, please try again later.",
});

// middlewares
app.use(limiter);
app.use(cors());
app.use(bodyParser.json({ type: "application/json" }));

app.use("/api/users", require("./routes/users"));
app.use("/api/interviews", require("./routes/interviews"));
app.use("/api/comments", require("./routes/comments"));

app.listen(PORT, () => {
  console.log(`Running on port: ${PORT}`);
});
