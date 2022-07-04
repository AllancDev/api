import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { StudentModel } from 'src/models/student.model';
import { AuthService } from 'src/services/auth.service';
import { CredentialsDto } from 'src/repository/dto/auth/credentials.dto';
import { getStudent } from 'src/decorators/get-student.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signin')
  async signIn(@Body(ValidationPipe) credentialsDto: CredentialsDto) {
    return await this.authService.signIn(credentialsDto);
  }

  @Get('/me')
  @UseGuards(AuthGuard())
  getMe(@getStudent() student: StudentModel): StudentModel {
    return student;
  }
}
