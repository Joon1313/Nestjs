import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/users/entities/user.entity';
import { GetUser } from 'src/users/get-user.decorator';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Controller('board')
@UseGuards(AuthGuard())
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  create(
    @Body(ValidationPipe) createBoardDto: CreateBoardDto,
    @GetUser() user: User,
  ) {
    return this.boardService.create(createBoardDto, user);
  }

  @Get()
  findAll() {
    return this.boardService.findAll();
  }

  @Get('/user')
  findUserBoard(@GetUser() user: User) {
    return this.boardService.findUserBoard(user);
  }
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.boardService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateBoardDto: UpdateBoardDto,
  ) {
    return this.boardService.update(id, updateBoardDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.boardService.remove(id);
  }
}
