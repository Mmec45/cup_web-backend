import { IsString, IsInt, Min } from 'class-validator';

export class CreateCoffeeDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly description: string;

  @IsInt()
  @Min(0)
  readonly price: number;

  @IsInt()
  @Min(0)
  readonly quantity: number;
}
