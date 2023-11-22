import { Transform } from 'class-transformer';
import {
  IsLatLong,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Resena } from 'src/resena/entities/resena.entity';

export class CreateRestauranteDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  direccion: string;

  @IsNotEmpty()
  @IsString()
  telefono: string;

  @IsNotEmpty()
  @IsString()
  categoria: string;

  @IsNotEmpty()
  @IsString()
  longitud: string;

  @IsNotEmpty()
  @IsString()
  latitud: string;

  @IsOptional()
  @IsString()
  foto: string;

  @IsNotEmpty()
  @IsString()
  rating: string;

  @IsOptional()
  resenas: Resena[];
}
