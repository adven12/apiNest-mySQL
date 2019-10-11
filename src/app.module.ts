import { Module } from '@nestjs/common';
import { DatabaseModule } from './db.connection/db-module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import {Repository} from 'typeorm'
import { authProviders, booksProviders, usersProviders, rolesProviders, usersrolesProviders, OrderBooksProviders} from './providers';
import { AuthService, BooksService, UsersService, OrderService } from './services';
import { AuthController, UsersController, BooksController, OrderController } from './controllers';
import { LocalStrategy, JwtStrategy, RolesGuard } from './common';
import { AuthRepository, UsersRepository, UserRolesRepository, BooksRepository, OrderBooksRepository} from './repositories'

import { jwtConstants } from './secrets/jwtSecretKey';
import { ConfigModule } from './environment/config.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '2h' },
    }),],
  controllers: [BooksController, UsersController, AuthController, OrderController],
  providers: [
    AuthRepository,
    UsersRepository,
    UserRolesRepository,
    BooksRepository,
    OrderBooksRepository,
    Repository,
    LocalStrategy,
    JwtStrategy,
    BooksService,
    ...booksProviders,
    UsersService,
    ...usersProviders,
    AuthService,
    ...authProviders,
    ...rolesProviders,
    ...usersrolesProviders,
    ...OrderBooksProviders,
    OrderService,
    ...OrderBooksProviders,
    RolesGuard
  ]
}
)
export class AppModule { }
