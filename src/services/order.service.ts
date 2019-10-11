import { Injectable, Inject, HttpException, BadRequestException, NotFoundException } from '@nestjs/common';
import { Book } from '../entities/books.entity';
import { getToken } from '../common/actions'
import { BookResponseModel } from '../models/book.models'
import  {  OrderBooksRepository } from '../repositories';
import { Repository } from 'typeorm'

@Injectable()
export class OrderService {
    // [x: string]: any;
  constructor(
    public OrderBooksRepository: OrderBooksRepository
   ) { }

  async postBooks(req): Promise<BookResponseModel> {    
    if (req.body) {
      const book = req.body;
      await this.OrderBooksRepository.create(book) 
      return { success: true }
    }
  }


}