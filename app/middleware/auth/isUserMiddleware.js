"use strict";
import authService from '../../src/service/authService.js';
import jwt from 'jsonwebtoken';
import responseStatus from '../../util/responseStatus.js';
import jwtConfig from '../../../config/jwt.js';
import ErrorLogger from '../../helper/errorLogHelper.js';

class isUserMiddleware {
  async middleware(req, res, next) {
    const authHeader = req.headers.authorization;
    const { code, message } = responseStatus.getStatus('UNAUTHORIZED');

    if (!authHeader) {
      return res.status(code).json({ status: code, message, error: 'UNAUTHORIZED: Token is missing' });
    }

    const checkBlacklist = await authService.checkBlackListToken(authHeader);

    if (checkBlacklist) {
      return res.status(code).send({ status: code, message, error: 'This token is invalid or blacklist' });
    }

    const token = authHeader.substring(7);

    try {
      const decoded = await jwt.verify(token, jwtConfig.JWT_SECRET);

      req.user = decoded;

      if (req.user.role !== 'user') {
        return res.status(403).json({ status: 403, message: 'Forbidden: Insufficient role permissions' });
      }

      next();
    } catch (error) {
      ErrorLogger.logError(error, 'User Token Verification Error');
      return res.status(401).send({ status: 401, message: 'Unauthorized: Invalid token' });
    }
  }
}

export default new isUserMiddleware().middleware;
