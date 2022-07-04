import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseController } from 'src/controllers/course.controller';
import { CourseModel } from 'src/models/course.model';

import { CourseService } from 'src/services/course.service';

@Module({
  imports: [TypeOrmModule.forFeature([CourseModel])],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
