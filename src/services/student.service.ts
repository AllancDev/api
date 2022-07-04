import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentModel } from 'src/models/student.model';
import { CreateStudentDto } from 'src/repository/dto/student/create-student.dto';
import { StudentRepository } from 'src/repository/student.repository';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentRepository)
    private studentRepository: StudentRepository,
  ) {}

  async createStudentUser(
    createStudentDto: CreateStudentDto,
  ): Promise<StudentModel> {
    if (createStudentDto.password != createStudentDto.passwordConfirmation) {
      throw new UnprocessableEntityException('As senhas não conferem');
    } else {
      return this.studentRepository.createStudent(createStudentDto);
    }
  }
}
