// eslint-disable-next-line prettier/prettier
import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { SignInUserDto } from './dto/signIn-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  // 회원가입
  async create(createUserDto: CreateUserDto): Promise<void> {
    const { name, user_id, password, age } = createUserDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.usersRepository.create({
      name,
      user_id,
      age,
      password: hashedPassword,
    });
    console.log(user);
    try {
      await this.usersRepository.save(user);
    } catch (err) {
      if (err.code == '23505') {
        throw new ConflictException('ID already in use');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
  //로그인
  async signIn(signInUserDto: SignInUserDto): Promise<{ token: string }> {
    const { user_id, password } = signInUserDto;
    const user = await this.usersRepository.findOne({
      user_id: user_id,
    });
    // 로그인 성공 로직
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { user_id };
      const token = await this.jwtService.sign(payload);
      return { token };
    }
    //로그인 실패 로직
    else {
      throw new UnauthorizedException('login failed');
    }
  }

  async signOut(user: User) {
    const { user_id } = user;
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne(id, {
      select: ['id', 'user_id', 'name', 'age'],
    });
    if (!user) {
      throw new NotFoundException(`can't find user with id ${id}`);
    } else {
      return user;
    }
  }
  //유저 업데이트
  async update(user: User, updateUserDto: UpdateUserDto): Promise<string> {
    const { name, password, age } = updateUserDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const updateUser = {
      ...user,
      name,
      password: hashedPassword,
      age,
    };
    await this.usersRepository.save(updateUser);
    return `This action updates a ${name} user`;
  }
  //유저 삭제
  async delete(id: number): Promise<string> {
    const res = await this.usersRepository.delete(id);
    if (res.affected === 0) {
      throw new NotFoundException(`can't find user with id ${id}`);
    }
    return `Deletion successful with user ID ${id}`;
  }
  // private async userFindOne(id: number): Promise<User> {
  //   const result = await this.usersRepository.findOne(id);
  //   if (!result) {
  //     throw new NotFoundException(`can't find user with id ${id}`);
  //   }
  //   return result;
  // }
}
