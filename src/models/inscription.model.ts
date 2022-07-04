import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { CourseModel } from './course.model';
import { StudentModel } from './student.model';

@Entity('inscription')
export class InscriptionModel extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  studentId: string;

  @Column('uuid')
  courseId: string;

  @OneToOne(() => StudentModel, (student: StudentModel) => student.id)
  @JoinColumn({ name: 'studentId' })
  student: StudentModel;

  @OneToOne(() => CourseModel, (course: CourseModel) => course.id)
  @JoinColumn({ name: 'courseId' })
  course: CourseModel;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
