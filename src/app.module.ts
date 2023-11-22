import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DataSourceConfig } from './config/data-source';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { RestauranteModule } from './restaurante/restaurante.module';
import { ResenaModule } from './resena/resena.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.develop.env`,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({ ...DataSourceConfig }),
    UserModule,
    RestauranteModule,
    ResenaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
