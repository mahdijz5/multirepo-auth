import { IsNotEmpty, IsString,IsEmail, Length } from "class-validator"

export class CreateUserDto {

    @IsNotEmpty()
    @IsEmail()
    @Length(0, 150)
    email : string

    @IsNotEmpty()
    @IsString()
    @Length(0, 150)
    username : string

    @IsNotEmpty()
    @IsString()
    @Length(5, 60)
    password : string

    @IsNotEmpty()
    @IsString()
    @Length(5, 60)
    confirmPassword : string   
}