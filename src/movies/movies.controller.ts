import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
    constructor(readonly moviesService: MoviesService){}

    @Get()
    getAll(){
        return this.moviesService.getAll();
    }
    
    @Get('/:id')
    getOne(@Param('id') id: string){
        return this.moviesService.getOne(id);
    }

    @Post()
    create(@Body() Moviedata){
        return Moviedata.name;
    }

    @Delete('/:id')
    delete(){
        return 'delete movies';

    }

    @Patch('/:id')
    patch(){
        return 'delete movies';
    }
}
