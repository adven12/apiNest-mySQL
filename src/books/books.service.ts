import { Injectable, Inject, HttpException, BadRequestException, NotFoundException } from '@nestjs/common';
import { books } from './books.entity';


@Injectable()
export class BooksService {
  constructor(
    @Inject('BOOKS_REPOSITORY') private readonly BOOKS_REPOSITORY: typeof books) { }

  async findAll(): Promise<books[]> {
    console.log('done');
    const books: any =  await this.BOOKS_REPOSITORY.findAll<books>();
    console.log('books: ', books);
    
    return books
  }

  async findOne(req): Promise<books> {
    let book: any = await this.BOOKS_REPOSITORY.findOne<books>({ where: { _id: req.params.id } });
    console.log(book);

    return book

  }


  async updatBook(req): Promise<any> {

    if (req.params.id) {
      console.log(req.body);
      const book = req.body;
      await this.BOOKS_REPOSITORY.update<books>(book, { where: { _id: req.params.id } })

      return new HttpException('Change is done', 200);

    } else return new BadRequestException()

  }

  async deleteBook(req): Promise<any> {
    console.log('del');
    if (req.params.id) {
      await this.BOOKS_REPOSITORY.destroy({ where: { _id: req.params.id } })

      return new HttpException('Del is done', 200);

    } else new BadRequestException()

  }

  async findBooksByTitle(req): Promise<books[]> {
    const Sequelize = require('sequelize');
    const title = req.params.title
    console.log(title);
    const Op = Sequelize.Op;
    const books = await this.BOOKS_REPOSITORY.findAll<books>({
      where:
      {
        title: {
          [Op.substring]: `${title}`
        }
      }
    });


    return books


  }


  async postBook(req): Promise<any> {
    console.log('22');
    console.log(req.body);
    
    if (req.body.name) {
      const book = req.body;
      await this.BOOKS_REPOSITORY.create<books>(book)

      return new HttpException('Add is done', 201);

    } else new BadRequestException()

  }

}