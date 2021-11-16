import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ){}

    getAll(){
        return this.userRepository.find();
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
