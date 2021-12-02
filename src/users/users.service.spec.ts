import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtStrategy } from './jwt.strategy';
import { UsersService } from './users.service';

const mockUserService = () => ({
  findOne: jest.fn(),
});

describe('UsersService', () => {
  let service: UsersService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: mockUserService() },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });
  describe('findOne', () => {
    it('find user id', () => {
      mockUserService.findOne.mockResolvedValue({ id: 20 });
    });
  });
});
