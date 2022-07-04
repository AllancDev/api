import { Injectable, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourseModel } from 'src/models/course.model';
import { JwtStrategy } from 'src/strategy/jwt.strategy';
import { AuthGuard } from '@nestjs/passport';

export interface CourseInterface {
  course: string;
  active: boolean;
}

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseModel)
    private courseRepository: Repository<CourseModel>,
  ) {}

  create(course: CourseInterface): Promise<CourseInterface> {
    return this.courseRepository.save(this.courseRepository.create(course));
  }

  findAll(): Promise<CourseInterface[]> {
    return this.courseRepository.find({
      where: { active: false },
    });
  }
}
