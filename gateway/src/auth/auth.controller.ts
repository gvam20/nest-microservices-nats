import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { SERVICE_NATS } from 'src/config';
import { ClientProxy } from '@nestjs/microservices';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(SERVICE_NATS) private readonly ClientNats: ClientProxy,
  ) {}

  @Post('register')
  registerUser(@Body() registerUserDto: RegisterUserDto) {
    return this.ClientNats.send('auth.register.user', { registerUserDto })
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.ClientNats.send('auth.login.user', { loginUserDto })
  }

  @Get('verify')
  verifyToken() {
    return this.ClientNats.send('auth.verify.user', {})
  }

}
