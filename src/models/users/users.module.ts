import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { ConfigModule } from '@nestjs/config';
import { JsonWebTokenStrategy } from '../../auth/strategies/jwt-strategy';
import {UserConversationModule} from "../user_conversation/user-conversation.module";
import {UserConversationRepository} from "../user_conversation/user-conversation.repository";
import {ConversationsModule} from "../conversations/conversations.module";
import {MessagesModule} from "../messages/messages.module";

@Module({
  imports: [ConfigModule, MessagesModule, UserConversationModule, ConversationsModule, TypeOrmModule.forFeature([UsersRepository, UserConversationRepository])],
  controllers: [UsersController],
  providers: [UsersService, ConfigModule, JsonWebTokenStrategy],
  exports: [UsersService],
})
export class UsersModule {}
