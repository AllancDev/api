import { EntityRepository, Repository } from 'typeorm';
import { CourseModel } from 'src/models/course.model';

@EntityRepository(CourseModel)
export class CourseRepository extends Repository<CourseModel> {}
