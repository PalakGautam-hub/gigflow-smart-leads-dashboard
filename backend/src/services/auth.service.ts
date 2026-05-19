import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { userRepository } from '../repositories/user.repository';
import { AuthResponse, UserPayload, UserRole } from '../types';
import { ConflictError, UnauthorizedError } from '../utils/errors';
import { RegisterInput, LoginInput } from '../validators/auth.validator';

export class AuthService {
  private generateToken(payload: UserPayload): string {
    return jwt.sign(payload, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'],
    });
  }

  async register(data: RegisterInput): Promise<AuthResponse> {
    const existingUser = await userRepository.exists(data.email);
    if (existingUser) {
      throw new ConflictError('User with this email already exists');
    }

    const user = await userRepository.create(data);

    const tokenPayload: UserPayload = {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    };

    const token = this.generateToken(tokenPayload);

    return {
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    };
  }

  async login(data: LoginInput): Promise<AuthResponse> {
    const user = await userRepository.findByEmail(data.email);
    if (!user) {
      throw new UnauthorizedError('Invalid email or password');
    }

    const isPasswordValid = await user.comparePassword(data.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid email or password');
    }

    const tokenPayload: UserPayload = {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    };

    const token = this.generateToken(tokenPayload);

    return {
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    };
  }

  async getProfile(userId: string): Promise<{
    id: string;
    name: string;
    email: string;
    role: UserRole;
  }> {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new UnauthorizedError('User not found');
    }

    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }
}

export const authService = new AuthService();
