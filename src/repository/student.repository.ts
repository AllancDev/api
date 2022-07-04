import { StudentModel } from 'src/models/student.model';
import { EntityRepository, Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

import { CreateStudentDto } from './dto/student/create-student.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CredentialsDto } from './dto/auth/credentials.dto';

@EntityRepository()
export class StudentRepository extends Repository<StudentModel> {
  async createStudent(
    createStudentDto: CreateStudentDto,
  ): Promise<StudentModel> {
    const { email, name, password } = createStudentDto;

    const user = new StudentModel();

    user.email = email;
    user.name = name;
    user.status = true;
    user.confirmationToken = crypto.randomBytes(32).toString('hex');
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save();
      delete user.password;
      delete user.salt;
      return user;
    } catch (error) {
      if (error.code.toString() === '23505') {
        throw new ConflictException('Endereço de email já está em uso');
      } else {
        throw new InternalServerErrorException(
          'Erro ao salvar o usuário no banco de dados',
        );
      }
    }
  }

  async checkCredentials(
    credentialsDto: CredentialsDto,
  ): Promise<StudentModel> {
    const { email, password } = credentialsDto;
    const user = await this.findOne({ where: { email, status: true } });

    if (user && (await user.checkPassword(password))) {
      return user;
    } else {
      return null;
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
