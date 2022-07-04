import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentController } from 'src/controllers/student.controller';
import { StudentModel } from 'src/models/student.model';
import { StudentRepository } from 'src/repository/student.repository';
import { StudentService } from 'src/services/student.service';

@Module({
  imports: [TypeOrmModule.forFeature([StudentModel])],
  controllers: [StudentController],
  providers: [StudentService, StudentRepository],
})
export class StudentModule {}
