import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { Coffee } from './coffees.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateQuantityDto } from './dto/update-quantity.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/role.enum';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @Get()
  findAll(): Promise<Coffee[]> {
    return this.coffeesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Coffee> {
    return this.coffeesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto): Promise<Coffee> {
    return this.coffeesService.create(createCoffeeDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Patch(':id')
  updateQuantity(
    @Param('id') id: number,
    @Body() updateQuantityDto: UpdateQuantityDto,
  ): Promise<Coffee> {
    return this.coffeesService.updateQuantity(id, updateQuantityDto.quantity);
  }
}
