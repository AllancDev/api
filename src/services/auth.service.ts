import { Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import { InjectRepository } from '@nestjs/typeorm';
import { StudentModel } from 'src/models/student.model';

import { Repository } from 'typeorm';

import { CredentialsDto } from '../repository/dto/auth/credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(StudentModel)
    private studentModel: Repository<StudentModel>,
    private jwtService: JwtService,
  ) {}

  async signIn(credentialsDto: CredentialsDto) {
    const student = await this.checkCredentials(credentialsDto);

    if (student == null) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    const jwtPayload = {
      id: student.id,
    };

    const token = await this.jwtService.sign(jwtPayload);

    return { token };
  }

  async checkCredentials(
    credentialsDto: CredentialsDto,
  ): Promise<StudentModel> {
    const { email, password } = credentialsDto;
    const user = await this.studentModel.findOne({
      where: { email, status: true },
    });

    if (user && (await user.checkPassword(password))) {
      return user;
    } else {
      return null;
    }
  }
}
