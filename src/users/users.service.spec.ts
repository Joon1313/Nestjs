import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

class MockRepository {
  async findOne(id) {
    const user: User = new User();
    user.id = id;
    return user;
  }
}

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
      // {
      //   provide: getRepositoryToken(User),
      //   useClass: MockRepository,
      // },
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('findOne user', () => {
    const id = 20;
    const res = service.findOne(id);
    expect(res).toEqual('finded user name joon');
  });
});
