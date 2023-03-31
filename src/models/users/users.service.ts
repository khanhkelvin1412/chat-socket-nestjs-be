import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { UserEntity } from './serializers/user.serializer';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UserConversationService } from '../user_conversation/user-conversation.service';
import {ConversationsService} from "../conversations/conversations.service";
import {MessagesService} from "../messages/messages.service";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository) private usersRepository: UsersRepository,
    private userConversationService: UserConversationService,
    private conventionService: ConversationsService,
    private messageService: MessagesService
  ) {}

  async findAll(
    relations: string[] = [],
    throwsException = false,
  ): Promise<UserEntity[]> {
    return await this.usersRepository.getAllEntity(relations, throwsException);
  }

  async create(inputs: CreateUserDto): Promise<UserEntity> {
    return await this.usersRepository.createEntity(inputs);
  }

  async findById(
    id: number,
    relations: string[] = [],
    throwsException = false,
  ): Promise<UserEntity> {
    return await this.usersRepository.getEntityById(
      id,
      relations,
      throwsException,
    );
  }

  async findUserAndMessageReadById(
    id: number,
    status: number | null,
  ): Promise<UserEntity> {
    return await this.usersRepository.findUserAndMessageReadById(id, status);
  }

  async update(user: UserEntity, inputs: User): Promise<UserEntity> {
    return await this.usersRepository.updateEntity(user, inputs);
  }

  async deleteById(id: number): Promise<boolean> {
    return await this.usersRepository.deleteEntityById(id);
  }

  async geUsersByEmail(email: string): Promise<UserEntity[]> {
    return await this.usersRepository.getUsersByEmail(email);
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    return await this.usersRepository.getUserByEmail(email);
  }

  async findAllConversations(
    user_id: number | string,
  ): Promise<User | UserEntity | null> {
    const userIds = [user_id];
    const userConversations = await this.userConversationService.findByUserId(
      userIds[0],
    );

    const conventionIds = userConversations.map(
      (userConvention) => userConvention.conversation_id,
    );

    const conversations = await this.conventionService.findByIds(conventionIds);

    const messages = await this.messageService.findAll();

    conversations.forEach(conversation => {
      const messageOfConversations = messages.filter(
        (message) => message.conversation_id === conversation.id,

      if (messageOfConversations && messageOfConversations.length > 0) {
        conversation.messages = messageOfConversations;
      }
    })

    const data = await this.usersRepository.getUserById(userIds[0]);
    if (!data) {
      return null;
    }

    data.conversations = conversations;

    // data.conversations =
    //   userConversations && userConversations.length > 0
    //     ? userConversations.map((conversation) => {
    //         conversation.users = conversation.users
    //           ? conversation.users.map((user) => {
    //               return {
    //                 ...user,
    //                 last_message_id:
    //                   user?.last_message_id?.last_message_id || null,
    //               };
    //             })
    //           : [];
    //
    //         conversation.messages = conversation.messages
    //           ? [conversation.messages]
    //           : [];
    //         return conversation;
    //       })
    //     : [];

    return data;
  }
}
