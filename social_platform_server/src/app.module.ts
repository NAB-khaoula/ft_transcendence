import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Channels } from './channels/entity/channels.entity';
import { Users } from './users/entity/users.entity';
import { ConnectionsModule } from './connections/connections.module';
import { FriendshipsModule } from './friendships/friendships.module';
import { MessagesChannelsModule } from './messages-channels/messages-channels.module';
import { MessagesDmsModule } from './messages-dms/messages-dms.module';
import { Connection } from './connections/entities/connection.entity';
import { Friendship } from './friendships/entities/friendship.entity';
import { MessagesChannel } from './messages-channels/entities/messages-channel.entity';
import { MessagesDM } from './messages-dms/entities/messages-dm.entity';
import { ChannelsModule } from './channels/connections.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST,
      port: +process.env.PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [Channels, Users, Connection, Friendship, MessagesChannel, MessagesDM],
      synchronize: true,
      
    }),
    ChannelsModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '2 days' },
    }),
    ConnectionsModule,
    FriendshipsModule,
    MessagesChannelsModule,
    MessagesDmsModule,
    AuthModule
  ],
})
export class AppModule {}
