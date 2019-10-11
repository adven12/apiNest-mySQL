import { Injectable, Inject } from '@nestjs/common';
import { Order } from '../entities';
// import { try } from 'bluebird';


@Injectable()
export class OrderBooksRepository {
    @Inject('ORDER_BOOKS_REPOSITORY') public ORDER_BOOKS_REPOSITORY: typeof Order   
    
    async create(book: Order[]){
        return await this.ORDER_BOOKS_REPOSITORY.bulkCreate(book)     
    }
}