import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ){}

    getAll(){
        return this.userRepository.find();
    }
    async Test(){
        const password = 'test1';
        const hash = await bcrypt.hash(password, 11);
        const isMatch = await bcrypt.compare(password, hash);
        console.log(hash);
        console.log(isMatch);
    }
    async getOne(id:number) :Promise<User> {
        const user = await this.userRepository.findOne(id);
        if(!user) throw new NotFoundException();
        return user;
    }

    async created(user:User){
        const found = await this.userRepository.save(user);
        return found;
    }
}
