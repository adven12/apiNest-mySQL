import { Injectable, Inject, HttpException, BadRequestException, NotFoundException } from '@nestjs/common';
import { Book } from '../entities/books.entity';
import { getToken } from '../common/actions'
import { BookResponseModel } from '../models/book.models'
import  { BooksRepository } from '../repositories';

@Injectable()
export class BooksService {
    // [x: string]: any;
  constructor(
    public BooksRepository: BooksRepository,
   ) { }

  async findAll(): Promise<Book[]> {
    const books: any =  await this.BooksRepository.findAll();
    return books
  }

  async findOne(req): Promise<BookResponseModel> {
    let book:any = await this.BooksRepository.findOne({ where: { _id: req.params.id } });
    return { success: true, data: book }
  }

  async updateBook(req): Promise<BookResponseModel> {
      const book = req.body;
      await this.BooksRepository.update(book, { where: { _id: req.params.id } })

      return { success: true }
  }

  async deleteBook(req): Promise<void> {
      let bookExist = await this.BooksRepository.findOne({where: {_id: req.params.id}})
      if(!bookExist){
        throw new HttpException('Book does not exist', 400)
      } else await this.BooksRepository.destroyBooks({ where: { _id: req.params.id } })      
}

  async postBook(req): Promise<BookResponseModel> {
    console.log(req.body)
    console.log(req.data)
    
    if (req.body.name) {
      const book = req.body;
      await this.BooksRepository.create(book) 
      return { success: true }
    }
  }


}