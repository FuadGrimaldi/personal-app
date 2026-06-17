const redis = require("../../config/redis");

const isRedisAvailable = () => {
  return redis.status === "ready";
};

module.exports = {
  isRedisAvailable,
};
