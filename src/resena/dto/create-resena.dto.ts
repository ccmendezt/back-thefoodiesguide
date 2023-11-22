import { IsDecimal, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateResenaDto {
  @IsNotEmpty()
  @IsString()
  autor: string;

  @IsNotEmpty()
  @IsString()
  rating: string;

  @IsNotEmpty()
  @IsString()
  texto: string;
}
