import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

import { CourseInterface, CourseService } from 'src/services/course.service';

export interface CreateCourseDto {
  course: string;
  active: boolean;
}

@Controller('course')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Post()
  async create(@Body() createCourseDto: CreateCourseDto) {
    const course = await this.courseService.create(createCourseDto);

    if (!course) {
      return { error: 'error in creating course' };
    }

    return { message: 'Curso criado com sucesso!' };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(@Req() request: Request) {
    const courses: Array<CourseInterface> = await this.courseService.findAll();
    return courses;
  }
}
