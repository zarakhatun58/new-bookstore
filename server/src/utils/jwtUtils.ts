import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

const generateToken = (userId: number): string => {
    return jwt.sign({ userId }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
  };

  const verifyToken = (token: string) => {
    try {
      return jwt.verify(token, process.env.JWT_SECRET as string);
    } catch (error: any) {
      if (error.name === 'TokenExpiredError') {
        return { message: 'Token has expired' };
      }
      if (error.name === 'JsonWebTokenError') {
        return { message: 'Invalid token' };
      }
      return { message: 'An error occurred during token verification' };
    }
  };
  

export { generateToken, verifyToken };
