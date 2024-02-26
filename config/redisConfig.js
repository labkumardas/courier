"use strict";
import dotenv from 'dotenv';
dotenv.config();
const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = process.env;
export default {
    host: REDIS_HOST || 'localhost',
    port: REDIS_PORT || 6379,
    password: REDIS_PASSWORD || null,
};