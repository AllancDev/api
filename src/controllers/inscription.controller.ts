import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { getStudent } from 'src/decorators/get-student.decorator';
import { InscriptionModel } from 'src/models/inscription.model';
import { StudentModel } from 'src/models/student.model';
import { InscriptionService } from 'src/services/inscription.service';

export interface createInscriptionDTO {
  studentId: string;
  courseId: string;
}

@Controller('inscription')
export class InscriptionController {
  constructor(private inscriptionService: InscriptionService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() createInscriptionDto, @Req() request) {
    const { id } = request.user;
    const { courseId } = createInscriptionDto;

    const info: createInscriptionDTO = {
      studentId: id,
      courseId,
    };

    const inscription = await this.inscriptionService.create(info);

    if (!inscription) {
      return { error: 'error inscription!' };
    }

    return { message: 'success inscription!' };
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id/delete')
  async delete(@Param('id') id, @Req() request) {
    const studentId = request.user.id;

    const deleteInscription = await this.inscriptionService.delete(
      id,
      studentId,
    );

    if (!deleteInscription) {
      return { error: 'error delete' };
    }

    return { message: 'deleted success' };
  }
}
