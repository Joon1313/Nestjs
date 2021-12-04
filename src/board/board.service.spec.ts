import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../users/entities/user.entity';
import { BoardService } from './board.service';

jest.mock('./board.service');

describe('BoardService', () => {
  let service: BoardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoardService],
    }).compile();

    service = module.get<BoardService>(BoardService);
    jest.clearAllMocks();
  });

  test('findOne Board', async () => {
    const user = await service.findOne(1);
    console.log('user', user);
    expect(user).toEqual(2);
  });

});
