import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from './constants';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, LocalStrategy, JwtStrategy],
      imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '1h' },
        }),
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should validate the user', async () => {
    const result = await service.validateUser(
      'pawel.mieleszkiewicz@example.com',
      'password',
    );

    expect(result).not.toBeNull();
  });

  it('should generate JWT for user', async () => {
    const { access_token } = await service.generateJWTToken({
      email: 'pawel.mieleszkiewicz@example.com',
      id: 'random-id',
    });

    expect(access_token).toBeDefined();
  });
});
