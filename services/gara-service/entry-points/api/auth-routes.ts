import { logger } from '@practica/logger';
import express from 'express';
import {
  createUser,
  getAllUsers,
  getUserByUserName,
} from '../../domain/user-use-case';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import bcrypt from 'bcrypt';

export const authRoutes = () => {
  const refreshTokensDB: string[] = [];
  const router = express.Router();
  router.post('/register', registerUserHandler);
  router.post('/login', loginUserHandler);
  router.post('/token', handlerAcceptRefreshTokenToGenerateNewAccessToken);
  router.delete('/delRefreshToken', handlerDeleteRefreshToken);

  async function registerUserHandler(req, res, next) {
    try {
      logger.info(`Register API was called`);
      const users = await getAllUsers(req);
      const findUser = users.data.find(
        (item) => item.username === req.body.username
      );
      if (!findUser) {
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = {
          username: req.body.username,
          password: hashPassword,
        };
        console.log(newUser, '------newUser------');
        const userRegister = await createUser(newUser);
        return res.status(200).json(userRegister);
      } else {
        res.json({ message: 'Registration failed' });
      }
    } catch (error) {
      next(error);
      return undefined;
    }
  }

  async function loginUserHandler(req, res, next) {
    try {
      logger.info(`Login API was called`);
      const user = await getUserByUserName(req.username);
      if (user) {
        let submittedPass = req.body.password;
        let storedPass = user.password as string;

        const passwordMatch = await bcrypt.compare(submittedPass, storedPass);
        if (passwordMatch) {
          const payload = { username: req.body.username };

          const aToken = generateAccessToken(payload);
          const rToken = jwt.sign(
            payload,
            process.env.REFRESH_TOKEN_SECRET as string
          );
          refreshTokensDB.push(rToken);
          res.json({
            AccessToken: aToken,
            RefreshToken: rToken,
            message: 'You are logged-in',
          });
        } else {
          res.json({ message: 'Invalid email or password' });
        }
      } else {
        let fakePass = `$2b$$10$ifgfgfgfgfgfgfggfgfgfggggfgfgfga`; //fake password is used just to slow down the time required to send a response to the user
        await bcrypt.compare(req.body.password, fakePass);

        res.json({ message: 'Invalid email or password' });
      }
    } catch (error) {
      next(error);
      return undefined;
    }
  }

  function generateAccessToken(payload) {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, {
      expiresIn: '2m',
    });
  }

  async function handlerAcceptRefreshTokenToGenerateNewAccessToken(
    req,
    res,
    next
  ) {
    try {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
      if (token === null) {
        res.json({ message: 'Invalid refresh token' });
      }
      if (!refreshTokensDB.includes(token)) {
        res.json({ message: 'Forbidden' });
      }

      jwt.verify(
        token,
        process.env.REFRESH_TOKEN_SECRET as string,
        (err, payload) => {
          if (err) {
            res.json({ message: 'Some error occured' });
          } else {
            const accessToken = generateAccessToken({
              username: payload.username,
            });

            res.json({
              AccessToken: accessToken,
              message: 'This is your new access token',
            });
          }
        }
      );
    } catch (err) {
      next(err);
      return undefined;
    }
  }

  async function handlerDeleteRefreshToken(req, res) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token === null) {
      res.json({ message: 'Invalid access token' });
    } else {
      const index = refreshTokensDB.indexOf(token);
      // delete refreshTokensDB[index];
      refreshTokensDB.filter((data) => data !== token);
      res.json({ message: 'Refresh token deleted successfully' });
    }
  }

  return router;
};
