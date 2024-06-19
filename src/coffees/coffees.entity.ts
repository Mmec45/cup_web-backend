import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Order } from 'src/orders/order.entity';

@Entity()
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column('decimal')
  price: number;

  @Column()
  quantity: number;

  @OneToMany(() => Order, (order) => order.coffee)
  orders: Order[];
}
