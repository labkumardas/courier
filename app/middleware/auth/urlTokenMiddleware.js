"use strict";
import authService from '../../src/service/authService.js';
import jwt from 'jsonwebtoken';
import responseStatus from '../../util/responseStatus.js';
import jwtConfig from '../../../config/jwt.js';
import ErrorLogger from '../../helper/errorLogHelper.js';

class urlTokenMiddleware {
  constructor() {
    // this.publicKeyPath = "./config/public-key.pem";
  }

  async middleware(req, res, next) {
    const authHeader = req.body.token;
    const { code, message } = responseStatus.getStatus('UNAUTHORIZED');
    if (!authHeader) {
      return res.status(code).json({ status: code, message, error: 'UNAUTHORIZED: Token is missing' });
    }
    
    const token = authHeader.substring(7);
    try {
        jwt.verify(token, jwtConfig.JWT_SECRET, (err, decoded) => {
            if (err) {
              return res.status(401).json({ message: 'Failed to authenticate token' });
            }
            req.decoded = decoded;
            next();
          });
    } catch (error) {
       ErrorLogger.logError(error, 'URl Token Verification Error');

      return res.status(401).send({ status: 401, message: 'Unauthorized: Invalid token' });
    }
  }

}
export default new urlTokenMiddleware().middleware;
