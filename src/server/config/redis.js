const Redis = require("ioredis");
const config = require("./config");

const redis = new Redis({
  host: config.redis_host,
  port: config.redis_port,

  maxRetriesPerRequest: 1,

  retryStrategy(times) {
    if (times > 3) {
      return null; // stop reconnect
    }

    return Math.min(times * 200, 2000);
  },
});

redis.on("connect", () => {
  console.log("Connected to Redis");
});

redis.on("error", (err) => {
  console.error("Redis connection error:", err);
});

redis.on("close", () => {
  console.warn("Redis connection closed");
});

module.exports = redis;
