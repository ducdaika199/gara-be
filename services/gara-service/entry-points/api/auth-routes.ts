import { logger } from '@practica/logger';
import express from 'express';
import { createUser, getUserByUserName } from '../../domain/user-use-case';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import 'dotenv/config'

export const authRoutes = () => {
  const router = express.Router();
  router.post('/register', registerUserHandler);
  router.post('/login', loginUserHandler)

  async function registerUserHandler(req, res, next) {
    try {
      logger.info(`Register API was called`);
      const user = await getUserByUserName(req.username);
      if (!user) {
        const hashPassword = await bcrypt.hash(req.password, 10);
        const newUser = {
          userName: req.username,
          password: hashPassword
        }
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
        let storedPass = user.password;

        const passwordMatch = await bcrypt.compare(submittedPass, storedPass);
        if (passwordMatch) {
          const payload = { userName: req.body.userName };

          const aToken = generateAccessToken(payload);
          const rToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET as string);
          res.json({ AccessToken: aToken, RefreshToken: rToken, message: 'You are logged-in' });
        } else {

          res.json({ message: 'Invalid email or password' });
        }

      } else {
        let fakePass = `$2b$$10$ifgfgfgfgfgfgfggfgfgfggggfgfgfga`;		//fake password is used just to slow down the time required to send a response to the user
        await bcrypt.compare(req.body.password, fakePass);

        res.json({ message: 'Invalid email or password' });
      }
    } catch (error) {
      next(error);
      return undefined;
    }
  }

  function generateAccessToken(payload) {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '2m' });
  }

  return router;
};
