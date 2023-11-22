import { DataSource, DataSourceOptions, DefaultNamingStrategy } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import 'reflect-metadata';

ConfigModule.forRoot({
  envFilePath: `.develop.env`,
});

const configService = new ConfigService();

export const DataSourceConfig: DataSourceOptions = {
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: parseInt(configService.get('DB_PORT'), 10),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  entities: [__dirname + '/../**/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  synchronize: true,
  logging: false,
  namingStrategy: new DefaultNamingStrategy(),
};

export const AppDS = new DataSource(DataSourceConfig);
