import { Injectable } from '@nestjs/common';

@Injectable()
export class MoviesService {

    
    getAll():string{
        return 'getAll';
    }

    getOne(id:string):string{
        return `${id} hi`;
    }
}
