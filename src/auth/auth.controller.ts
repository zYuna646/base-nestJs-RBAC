import {
  Controller,
  Post,
  Request,
  UseGuards,
  Body,
  Get,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginBody, LoginResponseDto } from './dto/auth-dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiOperation({ summary: 'Login and get JWT token' })
  @ApiResponse({
    status: 200,
    description: 'Successfully logged in. Returns a JWT token.',
    type: LoginResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. Invalid credentials.',
  })
  async login(@Body() loginBody: LoginBody, @Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('validate')
  @ApiOperation({ summary: 'Validate JWT token and get user data' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. Invalid or expired JWT token.',
  })
  async validate(@Request() req) {
    console.log(req.user);
    return this.authService.getUserById(req.user.userId);
  }
}
