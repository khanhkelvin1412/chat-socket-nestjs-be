import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ApiConfigService} from './orm-config';
import { MessagesModule } from './models/messages/messages.module';
import { UsersModule } from './models/users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ConversationsModule } from './models/conversations/conversations.module';
import { UserConversationModule } from './models/user_conversation/user-conversation.module';
import { ProfilesModule } from './models/profiles/profiles.module';
import { GatewayModules } from './gatewaies/gateway.modules';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      entities: [__dirname + '/../../models/**/*.entity{.ts,.js}'],
      keepConnectionAlive: false,
      dropSchema: false,
      type: 'postgres',
      name: 'default',
      host: 'localhost',
      port: 5432,
      username: 'tester1',
      password: '1qazXSW@',
      database: 'chat_test',
      synchronize: true,
      autoLoadEntities: true,
      logging: true,
    }),
    MessagesModule,
    UsersModule,
    AuthModule,
    ConversationsModule,
    UserConversationModule,
    ProfilesModule,
    GatewayModules,
  ],
  controllers: [AppController],
  providers: [AppService, ApiConfigService],
})
export class AppModule {}
