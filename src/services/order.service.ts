import { Injectable, Inject, HttpException, BadRequestException, NotFoundException, Logger } from '@nestjs/common';
import { Order } from '../entities/order.entity';
import { getToken } from '../common/actions'
import { BookResponseModel } from '../models/book.models'
import  {  OrderBooksRepository } from '../repositories';
import { Repository } from 'typeorm'

@Injectable()
export class OrderService {
  constructor(
    public OrderBooksRepository: OrderBooksRepository
   ) { }

  async postBooks(books): Promise<BookResponseModel> { 
     
    if (books) {
      await this.OrderBooksRepository.create(books) 
      return { success: true }
    }
  }
  async findAll(): Promise<Order[]> {  
    const orders: any =  await this.OrderBooksRepository.findAll();
    console.log('Cheers!');  
    return orders
  }


}