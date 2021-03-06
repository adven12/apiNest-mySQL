import { Controller, Get, Post, Req, Put, Delete, UseGuards } from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { Request } from 'express'
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from "../common/role.guard"
import { getToken } from '../common/actions';
import {Roles} from "../common/roles.decorator"


@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) { }

    @UseGuards(AuthGuard('jwt'))
    @Post() 
    postBooks(@Req() req: Request): Promise<any> {    
        return this.orderService.postBooks(req.body);
    }

    @UseGuards(AuthGuard('jwt'))
    @UseGuards(RolesGuard)
    @Get() 
    @Roles('admin')
    findAll(@Req() req: Request): any { 
        return this.orderService.findAll(req.user);
    }
}
