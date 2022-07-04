import { StudentModel } from '../../../models/student.model';

export class ReturnStudentDto {
  student: StudentModel;
  message: string;
}
