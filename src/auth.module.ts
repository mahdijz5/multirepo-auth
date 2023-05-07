import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SharedModule, SharedService, UserEntity, UsersRepository, PostEntity } from '@mahdijz5/my-first-package';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtGuard } from './guards/jwt.guard';
import { JwtStrategy } from './strategies/jwt.strategy';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './env'
    }),
    JwtModule.register({

      secret: process.env.ACCESS_TOKRN_SECRET,
      signOptions: { expiresIn: '9000s' },


    }), 
    TypeOrmModule.forRoot({  
        type: "postgres",
        url: "postgresql://postgres:root@192.168.10.143:5432/postgres",
        // entities : [UserEntity,PostEntity],
        // username : process.env.POSTGRES_USER,
        // password : process.env.POSTGRES_PASSWORD,
        // port : parseInt(process.env.POSTGRES_PORT),
        // database : process.env.POSTGRES_DB,
        // synchronize: true,
        // autoLoadEntities: true,
    }),
    SharedModule,
    TypeOrmModule.forFeature([UserEntity, PostEntity])
  ],
  controllers: [AuthController],
  providers: [AuthService,
    JwtGuard,
    JwtStrategy,
    {
      provide: 'UsersRepositoryInterface',
      useClass: UsersRepository,
    },],

})
export class AuthModule { }
