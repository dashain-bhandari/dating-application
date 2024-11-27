import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';

import { OrderService } from './order.service';
import RequestWithUser from 'src/authentication/requestWithUser.interface';
import JwtAuthenticationGuard from 'src/authentication/jwt-authentication.guard';
import { CreateOrderDto } from './dto/createOrderDto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async createOrders(
    @Req() request: RequestWithUser,

    @Body() createOrderDto: CreateOrderDto,
  ) {
    return await this.orderService.createOrders({ ...createOrderDto, user: request.user });
  }

  @Get(':id')
  async findOrder(@Param('id') id: string) {
    return this.orderService.findOrder(id)
  }

  @Get()
  async findOrders() {
    return await this.orderService.findOrders();
  }

  @Put('paymentStatus/:orderId')
  async updateOrder(
    @Req() request: RequestWithUser,
    @Param('orderId') orderId: string,
    @Body() body: any
  ) {
   
    
    const updatedMessage = await this.orderService.updatePayment(orderId,body.paymentStatus);
    console.log(updatedMessage);
    return updatedMessage;
  }


}
