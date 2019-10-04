import { Injectable, Inject, HttpException, BadRequestException, NotFoundException } from '@nestjs/common';
import { Book } from '../entities/books.entity';
import { BookResponseModel } from '../models/book.models'

@Injectable()
export class BooksService {
    [x: string]: any;
  constructor(
    @Inject('BOOKS_REPOSITORY') private readonly BOOKS_REPOSITORY: typeof Book) { }

  async findAll(): Promise<Book[]> {
    const books: any =  await this.BOOKS_REPOSITORY.findAll<Book>();
    return books
  }

  async findOne(req): Promise<BookResponseModel> {
    let book: any = await this.BOOKS_REPOSITORY.findOne<Book>({ where: { _id: req.params.id } });
    return { success: true, data: book }
  }

  async updateBook(req): Promise<BookResponseModel> {
      const book = req.body;
      await this.BOOKS_REPOSITORY.update<Book>(book, { where: { _id: req.params.id } })

      return { success: true }
  }

  async deleteBook(req): Promise<BookResponseModel> {
    if(req.params.id){
      await this.BOOKS_REPOSITORY.destroy({ where: { _id: req.params.id } })
      return { success: true }
    }

}

  async postBook(req): Promise<BookResponseModel> {
    if (req.body.name) {
      const book = req.body;
      await this.BOOKS_REPOSITORY.create<Book>(book) 
      return { success: true }
    }
  }

}