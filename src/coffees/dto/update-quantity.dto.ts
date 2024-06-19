import { IsInt, Min } from 'class-validator';

export class UpdateQuantityDto {
  @IsInt()
  @Min(0)
  readonly quantity: number;
  static quantity: number;
}
