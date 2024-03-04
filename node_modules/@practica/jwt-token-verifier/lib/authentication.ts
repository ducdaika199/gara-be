import jwt from 'jsonwebtoken';

export const secure = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token === null) {
    res.json({ message: 'Invalid access token' });
  } else {
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string,
      (err, user) => {
        if (err) {
          res.json({ message: 'Some error occured' });
        } else {
          next();
        }
      }
    );
  }
};
