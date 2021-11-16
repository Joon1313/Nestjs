import { Injectable } from '@nestjs/common';
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

    async created(user:User){
        let i = [];
        for (let index = 0; index < 9999; index++) {
            i.push(index);
        }
        for await (let v of i) {
           this.userRepository.save(user);   
        }
        // await this.userRepository.save(user);    
    }
}
