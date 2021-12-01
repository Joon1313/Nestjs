import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule],
      controllers: [UsersController],
      providers: [UsersService, JwtService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  describe('findOne', () => {
    it('find user id', async () => {
      const userId = ['test'];
      // jest.spyOn(service, 'findOne').mockImplementation(() => userId);
      expect(await controller.findOne(20)).toEqual('finded user name joon');
    });
  });
});
