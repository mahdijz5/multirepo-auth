import { UserRepositoryInterface } from '@mahdijz5/my-first-package';
import { Injectable, Inject, BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from './dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(@Inject('UsersRepositoryInterface') private readonly usersRepository: UserRepositoryInterface, private jwtService: JwtService) { }
  
  async createUser(data){
    const isExist = await  this.usersRepository.findByCondition({where :{email : data.email}})
    if(isExist) {
      throw new BadRequestException()
    }
    const user = this.usersRepository.create(data)
    return await this.usersRepository.save(user)
  }

  async login(data : LoginUserDto){
    try {
      const user =await this.usersRepository.findByCondition({where : {email : data.email}})
      if(!user) {
        throw new UnauthorizedException("Password or email is incorrect.")
      }
      if(user.password !== data.password) {
        throw new UnauthorizedException("Password or email is incorrect.")
      }

      return this.generateToken(user)
    } catch (error) {
        throw error
    }
  }

  generateToken(user ) {
    return {
        accessToken: this.jwtService.sign({
            id: user.id,
            username: user.username,
            email: user.email,
            roles : user.userRoleRl?.roles
        }, { secret: process.env.ACCESS_TOKRN_SECRET }),
        refreshToken: this.jwtService.sign({
            id: user.id,
            username: user.username,
            email: user.email,
            roles : user.userRoleRl?.roles
        },
            { secret: process.env.REFRESH_TOKEN_SECRET })
    }
}


  async getUser(id: number){
    const user =await this.usersRepository.findOneById(id)
    if(!user) {
      throw new NotFoundException("User not found.")
    }

    return user
  }
}
