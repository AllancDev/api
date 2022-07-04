/* eslint-disable @typescript-eslint/no-empty-function */
import { Body, Controller, Post } from '@nestjs/common';

import { CreateStudentDto } from 'src/repository/dto/student/create-student.dto';
import { ReturnStudentDto } from 'src/repository/dto/student/return-student.dto';
import { StudentService } from 'src/services/student.service';

@Controller('/student')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Post('')
  async create(
    @Body() createStudentDto: CreateStudentDto,
  ): Promise<ReturnStudentDto> {
    const student = await this.studentService.createStudentUser(
      createStudentDto,
    );

    return {
      student,
      message: 'Aluno cadastrado com sucesso',
    };
  }
}
