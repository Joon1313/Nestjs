import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { BoardService } from './board.service';
import { Board } from './entities/board.entity';

const mockRepository = () => ({
  create: jest.fn().mockImplementation((dto) => dto),
  findOne: jest.fn().mockImplementation((dto) => dto),
  save: jest.fn().mockImplementation((dto) => dto),
});

describe('BoardService', () => {
  let service: BoardService;
  // let boardRepository: Repository<Board>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BoardService,
        {
          provide: getRepositoryToken(Board),
          useValue: mockRepository(),
        },
      ],
    }).compile();

    service = module.get<BoardService>(BoardService);
    // boardRepository = module.get(getRepositoryToken(Board));
  });
  test('create Board', async () => {
    const user = new User;
    user.name = '장경준';
    user.age = 28;
    user.user_id = '10';
    const board = await service.create(
      { title: '제목', content: '내용' },
      user,
    );
    console.log(board);
  });
  test('findOne Board', async () => {
    const board = await service.findOne(1);
    console.log(board);
    // expect(b).toHaveBeenCalled();
  });
});
