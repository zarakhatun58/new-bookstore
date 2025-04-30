import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import * as UserModel from '../models/userModel';
import { generateToken } from '../utils/jwtUtils';
import jwt from 'jsonwebtoken';

// Register
export const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { username, email, password } = req.body;
  
      const existingUser = await UserModel.getUserByEmail(email);
      if (existingUser) {
        res.status(400).json({ message: 'User already exists' });
        return;
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
    
      const insertedIds = await UserModel.createUser({ username, email, password: hashedPassword });
  
      res.status(201).json({
        message: 'User registered successfully',
        userId: insertedIds[0], 
      });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };  

// Login
export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
  
      // Get user by email
      const user = await UserModel.getUserByEmail(email);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;  // Don't forget to return after sending a response
      }
  
      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(400).json({ message: 'Invalid credentials' });
        return;  // Don't forget to return after sending a response
      }
  
      // Generate JWT token
    //   const token = generateToken(user.id);
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
      // Send the token
      res.status(200).json({
        message: 'Login successful',
        token,  // Send JWT token
      });
    } catch (error) {
      // Handle any errors
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
// Get Profile
export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    const user = await UserModel.getUserById(userId);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
