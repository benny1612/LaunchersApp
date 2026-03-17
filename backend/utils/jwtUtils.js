import jwt from 'jsonwebtoken';

export const createToken = (user) => {
  return jwt.sign(
    { 
      id: user._id, 
      username: user.username, 
      user_type: user.user_type 
    },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
};
export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};