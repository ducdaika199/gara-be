/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import * as util from 'util';

const verifyJwt = util.promisify(jwt.verify).bind(jwt) as any;

enum TokenPrefix {
  BEARER = 'bearer',
}

export const authentication = (req, res, next) => {
  asyncHandler(req, res, next).catch(next);
};

const asyncHandler = async (req, res, next) => {
  const jwtSecret = process.env.ACCESS_TOKEN_SECRET;
  const authenticationHeader =
    req.headers.authorization || req.headers.Authorization;

  if (!authenticationHeader) {
    return res.sendStatus(401);
  }

  // A token comes in one of two forms: 'token' or 'Bearer token'
  const authHeaderParts = authenticationHeader.split(' ');
  if (authHeaderParts.length !== 2) {
    // It should have 1 or 2 parts (separated by space), the incoming string has unknown structure
    return res.sendStatus(401);
  }
  const [tokenPrefix, token] = authHeaderParts;

  // bearer token is for client request to server, basic token is for services call to each other
  if (tokenPrefix.toLowerCase() === TokenPrefix.BEARER) {
    try {
      const jwtContent = await jwt.verify(token, jwtSecret as string);
      if (!jwtContent) {
        return res.sendStatus(401);
      }
      next();
    } catch (error) {
      console.log('erorrs');
      return res.sendStatus(401);
    }
  }
};
