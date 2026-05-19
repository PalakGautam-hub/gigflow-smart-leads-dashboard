import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/auth.service';
import { AuthRequest } from '../types';
import { sendResponse } from '../utils/response';

export class AuthController {
  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const result = await authService.register(req.body);
      sendResponse(res, 201, 'User registered successfully', result);
    } catch (error) {
      next(error);
    }
  }

  async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const result = await authService.login(req.body);
      sendResponse(res, 200, 'Login successful', result);
    } catch (error) {
      next(error);
    }
  }

  async getProfile(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = await authService.getProfile(req.user!.id);
      sendResponse(res, 200, 'Profile retrieved successfully', user);
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();
