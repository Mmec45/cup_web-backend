import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { Coffee } from 'src/coffees/coffees.entity';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  delete(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
    @InjectRepository(Coffee)
    private readonly coffeesRepository: Repository<Coffee>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const coffee = await this.coffeesRepository.findOne({
      where: { id: createOrderDto.coffeeId },
    });
    if (!coffee) {
      throw new Error('Coffee not found');
    }
    const order = this.ordersRepository.create({
      ...createOrderDto,
      coffee,
    });
    return this.ordersRepository.save(order);
  }

  findAll(): Promise<Order[]> {
    return this.ordersRepository.find({ relations: ['coffee'] });
  }

  findOne(id: number): Promise<Order> {
    return this.ordersRepository.findOne({
      where: { id },
      relations: ['coffee'],
    });
  }

  async update(id: number, updateOrderDto: Partial<Order>): Promise<Order> {
    await this.ordersRepository.update(id, updateOrderDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.ordersRepository.delete(id);
  }
}
