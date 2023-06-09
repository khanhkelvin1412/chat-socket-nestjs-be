import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from '../models/users/users.service';
import { UsersRepository } from '../models/users/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../models/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JsonWebTokenStrategy } from './strategies/jwt-strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { EXPIRES_TIME, JWT_SECRET_KEY } from '../config/constants';
import {UserConversationModule} from "../models/user_conversation/user-conversation.module";
import {ConversationsModule} from "../models/conversations/conversations.module";
import {MessagesModule} from "../models/messages/messages.module";

@Module({
  imports: [
    UsersModule,
      UserConversationModule,
      ConversationsModule,
      MessagesModule,
    TypeOrmModule.forFeature([UsersRepository]),
    PassportModule,
    JwtModule.register({
      secret: JWT_SECRET_KEY,
      signOptions: { expiresIn: EXPIRES_TIME },
    }),
  ],
  providers: [AuthService, UsersService, LocalStrategy, JsonWebTokenStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
