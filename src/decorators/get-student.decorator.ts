import { createParamDecorator } from '@nestjs/common';
import { StudentModel } from 'src/models/student.model';

export const getStudent = createParamDecorator((data, req): StudentModel => {
  console.log(req);
  return req.user;
});
