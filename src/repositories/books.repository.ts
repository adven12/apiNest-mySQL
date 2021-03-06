import { Injectable, Inject } from '@nestjs/common';
import { Book, Order } from '../entities';


@Injectable()
export class BooksRepository {
    @Inject('BOOKS_REPOSITORY') public BOOKS_REPOSITORY: typeof Book
   
    async findAll(){
        return  this.BOOKS_REPOSITORY.findAll<Book>();
    }
    async findOne(id: any){        
        return this.BOOKS_REPOSITORY.findOne<Book>( id )
    }
    async update(book: Book, id: any){
        return this.BOOKS_REPOSITORY.update<Book>(book, id)
    }
    async destroyBooks(id: any){
        return this.BOOKS_REPOSITORY.destroy(id)
    }
    async create(book: Book){
        return this.BOOKS_REPOSITORY.create<Book>(book)
    }
}

