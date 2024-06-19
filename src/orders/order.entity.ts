import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Coffee } from '../coffees/coffees.entity';
import { User } from '../users/user.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Coffee)
  coffee: Coffee;

  @ManyToOne(() => User)
  user: User;

  @Column()
  quantity: number;

  @Column()
  totalPrice: number;

  @ManyToOne(() => Coffee, (coffee) => coffee.orders)
  coffeeItem: Coffee;
}
