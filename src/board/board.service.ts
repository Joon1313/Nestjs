import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import e from 'express';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
  ) {}
  async create(createBoardDto: CreateBoardDto, user: User) {
    const { title, content } = createBoardDto;
    const newBoard = this.boardRepository.create({ title, content, user });
    await this.boardRepository.save(newBoard);
    return newBoard;
  }

  async findAll() {
    const board = await this.boardRepository.find();
    if (!board) {
      throw new NotFoundException(`can't not find board`);
    }
    return board;
  }

  async findOne(id: number): Promise<Board> {
    const board = await this.boardRepository.findOne(id);
    if (!board) {
      throw new NotFoundException(`can't not find board with number ${id}`);
    }
    return board;
  }

  async findUserBoard(user: User) {
    const userBoard = await this.boardRepository.find({ user: user });
    if (!userBoard) {
      throw new NotFoundException(`can't not find user board`);
    }
    return userBoard;
  }

  update(id: number, updateBoardDto: UpdateBoardDto) {
    return `This action updates a #${id} board`;
  }

  async remove(id: number) {
    const res = await this.boardRepository.delete(id);
    if (res.affected == 0) {
      return 'board delete fail';
    } else {
      return `board delete success for number ${id}`;
    }
  }
}
