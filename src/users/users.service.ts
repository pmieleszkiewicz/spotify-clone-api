import { Injectable } from '@nestjs/common';

export type UserEntity = {
  id: string;
  email: string;
  password: string;
  updatedAt: Date;
  createdAt: Date;
};

@Injectable()
export class UsersService {
  private readonly users: [UserEntity] = [
    {
      id: '95778072-330b-4f82-9190-6682328f0d9d',
      email: 'pawel.mieleszkiewicz@example.com',
      password: 'password',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  async findOne(email: string): Promise<UserEntity | null> {
    return this.users.find((user) => user.email === email);
  }
}
