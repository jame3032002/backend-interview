const accessTokenSecretKey =
  process.env.ACCESS_TOKEN_SECRET_KEY || "ACCESS_TOKEN_SECRET_KEY";
const RATE_LIMIT_TIME_RESET = process.env.RATE_LIMIT_TIME_RESET || 1;
const RATE_LIMIT_REQUEST_PER_TIME_RESET =
  process.env.RATE_LIMIT_REQUEST_PER_TIME_RESET || 20;

module.exports = {
  accessTokenSecretKey,
  RATE_LIMIT_TIME_RESET,
  RATE_LIMIT_REQUEST_PER_TIME_RESET,
};
