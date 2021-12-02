import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  ParseIntPipe,
  Req,
  UseGuards,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SignInUserDto } from './dto/signIn-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  // 회원가입
  @Post()
  create(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<void> {
    return this.usersService.create(createUserDto);
  }
  //로그인
  @Post('signin')
  signIn(
    @Body(ValidationPipe) signInUserDto: SignInUserDto,
  ): Promise<{ token: string }> {
    return this.usersService.signIn(signInUserDto);
  }
  // 유저 찾기
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return this.usersService.findOne(id);
  }
  // 유저 업데이트
  @Patch()
  @UseGuards(AuthGuard())
  // eslint-disable-next-line prettier/prettier
  update(@GetUser() user:User, @Body(ValidationPipe) updateUserDto: UpdateUserDto) {
    return this.usersService.update(user, updateUserDto);
  }
  // 유저 삭제
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return this.usersService.delete(id);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@GetUser() user: User, @Req() req) {
    console.log('user', user);
  }
}
