import { Controller, Get, Post, Req, Put, Delete, UseGuards } from '@nestjs/common';
import { BooksService } from '../services/books.service';
import { Request } from 'express'
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from "../common/role.guard"
import { getToken } from '../common/actions';
import {Roles} from "../common/roles.decorator"


@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) { }

    @Get()
    findAll(): any {       
        return this.booksService.findAll();
    }

    @Get('/id/:id')
    findOne(@Req() req: Request): any {
        return this.booksService.findOne(req);
    }

    @UseGuards(AuthGuard('jwt'))
    @UseGuards(RolesGuard)
    @Put('/:id')
    @Roles('admin')
    updateBook(@Req() req: Request): any {
        return this.booksService.updateBook(req);
    }

    @UseGuards(RolesGuard)
    @Delete('/:id')
    @Roles('admin')
    deleteBook(@Req() req: Request): any {
        return this.booksService.deleteBook(req);
    }
    @UseGuards(AuthGuard('jwt'))
    @UseGuards(RolesGuard)
    @Post() 
    @Roles('admin')
    postBook(@Req() req: Request): Promise<any> {        
        return this.booksService.postBook(req);
    }
}
