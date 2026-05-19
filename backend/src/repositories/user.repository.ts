import { User } from '../models/user.model';
import { IUserDocument, UserRole } from '../types';

export class UserRepository {
  async findByEmail(email: string): Promise<IUserDocument | null> {
    return User.findOne({ email }).select('+password');
  }

  async findById(id: string): Promise<IUserDocument | null> {
    return User.findById(id);
  }

  async create(data: {
    name: string;
    email: string;
    password: string;
    role?: UserRole;
  }): Promise<IUserDocument> {
    return User.create(data);
  }

  async exists(email: string): Promise<boolean> {
    const user = await User.findOne({ email }).lean();
    return !!user;
  }
}

export const userRepository = new UserRepository();
