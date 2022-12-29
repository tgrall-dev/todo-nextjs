import client from './prisma';
import { compare } from 'bcryptjs';

export type UserData = {
  name: string;
  email: string;
  password: string;
}

export type User = {
  id: string,
} & UserData;

export class UserService {
  constructor() {
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await client.user.findUnique({
      where: {
        email: email,
      },
    });
    return user;
  }

  private async createUser(data: UserData) {
    const newUser = await client.user.create({ data: data });
    return newUser;
  }

  async register(data: UserData) {
    const existingUser = await this.getUserByEmail(data.email);
    if (existingUser) {
      throw new Error('User already exists');
    }
    const newUser = await this.createUser(data);
    //TODO might want to select limited fields here as password is present
    return newUser;
  }

  async authorize(data: Partial<UserData>): Promise<UserData | null> {
    if (data?.password && data?.email) {
      const dbuser = await this.getUserByEmail(data?.email);

      if (dbuser) {
        const result = await compare(data?.password, dbuser.password);
        if (result) {
          return dbuser;
        }
      }
    }
    return null;
  }

}

const userService = new UserService();
export default userService;