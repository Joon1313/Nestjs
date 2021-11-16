import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(readonly usersService:UsersService){}
    @Get()
    getAll(){
        return this.usersService.getAll();
    }
    @Post()
    async created(@Body() user:User): Promise<object>{
        await this.usersService.created(user);
        return user;
    }
}
