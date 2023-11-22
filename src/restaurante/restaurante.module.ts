import { Module } from '@nestjs/common';
import { RestauranteService } from './services/restaurante.service';
import { RestauranteController } from './controllers/restaurante.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurante } from './entities/restaurante.entity';
import { Resena } from 'src/resena/entities/resena.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurante, Resena])],
  controllers: [RestauranteController],
  providers: [RestauranteService],
  exports: [TypeOrmModule],
})
export class RestauranteModule {}
