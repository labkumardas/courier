"use strict";
import redis from 'redis';
import { promisify } from 'util';
import redisConfig from '../../config/redisConfig.js';

class redisServerHelper {
  constructor() {
    this.client = redis.createClient({
      host: redisConfig.host,
      port: redisConfig.port,
      password: redisConfig.password,
    });
    this.redisGetAsync = promisify(this.client.get).bind(this.client);
    this.redisSetAsync = promisify(this.client.set).bind(this.client);
  }
  async getData(key) {
    try {
      const cachedData = await this.redisGetAsync(key);
      return cachedData ? JSON.parse(cachedData) : null;
    } catch (error) {
      console.error('Error fetching data from Redis:', error);
      throw error;
    }
  }

  async setData(key, data, expirationInSeconds = 60) {
    try {
      const serializedData = JSON.stringify(data);
      await this.redisSetAsync(key, serializedData, 'EX', expirationInSeconds);
    } catch (error) {
      console.error('Error setting data in Redis:', error);
      throw error;
    }
  }
}
export default new redisServerHelper();

