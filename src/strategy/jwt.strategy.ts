import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentRepository } from '../repository/student.repository';
import { StudentModel } from 'src/models/student.model';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(StudentModel)
    private studentRepository: Repository<StudentModel>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'super-secret',
    });
  }

  async validate(payload: { id: string }) {
    const { id } = payload;

    const student = await this.studentRepository.findOne({
      select: ['id', 'name', 'email', 'status'],
      where: { id },
    });
    if (!student) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    return student;
  }
}
