import { Controller, Get, Post, Body, Param, UseGuards, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/role.enum';


@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  
  
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }
  
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get()
  findAll() {
    return this.ordersService.findAll();
  }
  
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post('update/:id')
  update(
    @Param('id') id: number,
    @Body() order: Partial<Order>,
  ): Promise<Order> {
    return this.ordersService.update(id, order);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete('delete/:id')
  remove(@Param('id') id: number): Promise<void> {
    return this.ordersService.remove(id);
  }

}
