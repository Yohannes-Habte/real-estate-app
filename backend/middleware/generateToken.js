import JWT from 'jsonwebtoken';

const generateToken = (id) => {
  const token = JWT.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};

export default generateToken;
