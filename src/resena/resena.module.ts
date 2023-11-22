import { Module } from '@nestjs/common';
import { ResenaService } from './services/resena.service';
import { ResenaController } from './controllers/resena.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resena } from './entities/resena.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Resena])],
  controllers: [ResenaController],
  providers: [ResenaService],
  exports: [TypeOrmModule],
})
export class ResenaModule {}
