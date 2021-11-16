import { Body, Controller, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(readonly usersService:UsersService){}
    //전체 조회
    @Get()
    getAll(){
        return this.usersService.getAll();
    }
    // 개별 조회
    @Get('/:id')
    getOne(@Param('id', ParseIntPipe) id:number){
        return this.usersService.getOne(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    created(@Body() user:User): Promise<User>{
        return this.usersService.created(user);
    }
}
