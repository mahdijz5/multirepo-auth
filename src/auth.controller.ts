import {  HttpExceptionFilter, SharedService } from '@mahdijz5/my-first-package';
import { UseFilters, Controller, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Ctx, EventPattern, KafkaContext, MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { CreateUserDto, LoginUserDto } from './dto';
import { JwtGuard } from './guards/jwt.guard';

@UseFilters(HttpExceptionFilter)
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService,
  private readonly sharedService: SharedService,) {}

  @MessagePattern('get-user')
  async getUser(@Payload() message : {id:number}) {
    try {
      const user = await this.authService.getUser(message.id)
      return {...user}
    } catch (error) {
      throw error
    }
  }

  @MessagePattern('login-user')
  async login(@Payload() data : LoginUserDto) {
    return await this.authService.login(data)
  }

  @UseGuards(JwtGuard)
  @MessagePattern('auth')
  async auth() {
    return true
  }

  @MessagePattern('register-user') 
  async createUser(@Payload() data : CreateUserDto) {
    try {
      const user = await this.authService.createUser(data)
      return {...user}
    } catch (error) {
      throw error
    }
  }
}
