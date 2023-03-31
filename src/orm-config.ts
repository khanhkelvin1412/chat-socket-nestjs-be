import {TypeOrmModuleOptions} from "@nestjs/typeorm";
import {Injectable} from "@nestjs/common";

@Injectable()
export class ApiConfigService {
  get postgresConfig(): TypeOrmModuleOptions {
    const entities = [
      __dirname + '/../../modules/**/*.entity{.ts,.js}',
      __dirname + '/../../modules/**/*.view-entity{.ts,.js}',
    ];

    return {
      entities,
      keepConnectionAlive: false,
      dropSchema: false,
      type: 'postgres',
      name: 'default',
      host: 'localhost',
      port: 5432,
      username: 'tester2',
      password: '1qazXSW@',
      database: 'chat_test',
      synchronize: true,
      autoLoadEntities: true,
      logging: true,
    };
  }
}
