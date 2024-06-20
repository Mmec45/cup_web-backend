import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coffee } from './coffees.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateQuantityDto } from './dto/update-quantity.dto';

@Injectable()
export class CoffeesService {
  remove(id: string) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeesRepository: Repository<Coffee>,
  ) {}

  findAll(): Promise<Coffee[]> {
    return this.coffeesRepository.find();
  }

  findOne(id: number): Promise<Coffee> {
    return this.coffeesRepository.findOne({ where: { id } });
  }

  async create(createCoffeeDto: CreateCoffeeDto): Promise<Coffee> {
    const coffee = this.coffeesRepository.create(
      createCoffeeDto as Partial<Coffee>,
    );
    return this.coffeesRepository.save(coffee);
  }
   
  async updateQuantity(id: number, quantity: number): Promise<Coffee> {
    const coffee = await this.coffeesRepository.findOne({ where: { id } });
    coffee.quantity = UpdateQuantityDto.quantity;
    return this.coffeesRepository.save(coffee);
   }
}
