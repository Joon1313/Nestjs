// eslint-disable-next-line prettier/prettier
import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

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

  async findOne(id: number): Promise<string>{
    const result = await this.usersRepository.findOne(id);
    if (!result) {
      throw new NotFoundException(`can't find user with id ${id}`);
    } else {
      return `finded user name ${result.name}`;
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<string> {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`can't find user with id ${id}`);
    }
    const { name, user_id, password, age } = updateUserDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const updateUser = {
      ...user,
      name,
      user_id,
      password: hashedPassword,
      age,
    };
    await this.usersRepository.save(updateUser);
    return `This action updates a #${id} user`;
  }

  async delete(id: number): Promise<string> {
    const res = await this.usersRepository.delete(id);
    if (res.affected === 0) {
      throw new NotFoundException(`can't find user with id ${id}`);
    }
    return `Deletion successful with user ID ${id}`;
  }
}
