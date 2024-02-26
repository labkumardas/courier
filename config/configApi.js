"use strict"
import dotenv from 'dotenv';
dotenv.config();
const { API_PREFIX, API_PREFIX_USER } = process.env;
export default {
    apiPrefix: API_PREFIX,
    apiPrefixUser: API_PREFIX_USER 
};