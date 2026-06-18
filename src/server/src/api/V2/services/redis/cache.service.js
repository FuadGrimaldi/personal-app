const redis = require("../../../../../config/redis");
const { isRedisAvailable } = require("../../../../helpers/redisCheckConn");

const getCache = async (key) => {
  try {
    if (!isRedisAvailable()) {
      return null;
    }

    const cachedData = await redis.get(key);

    return cachedData ? JSON.parse(cachedData) : null;
  } catch (error) {
    console.warn("Redis unavailable, skipping cache read:", error.message);
    return null;
  }
};

const setCache = async (key, value, ttl = 300) => {
  try {
    if (!isRedisAvailable()) {
      return;
    }

    await redis.set(key, JSON.stringify(value), "EX", ttl);
  } catch (error) {
    console.warn("Redis unavailable, skipping cache write:", error.message);
  }
};

const deleteCache = async (key) => {
  try {
    if (!isRedisAvailable()) {
      return;
    }

    await redis.del(key);
  } catch (error) {
    console.warn("Redis unavailable, skipping cache delete:", error.message);
  }
};

module.exports = {
  getCache,
  setCache,
  deleteCache,
};
