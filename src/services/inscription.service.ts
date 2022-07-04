import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InscriptionModel } from 'src/models/inscription.model';
import { createInscriptionDTO } from 'src/controllers/inscription.controller';

@Injectable()
export class InscriptionService {
  constructor(
    @InjectRepository(InscriptionModel)
    private inscriptionRepository: Repository<InscriptionModel>,
  ) {}

  create(inscription: createInscriptionDTO): Promise<InscriptionModel> {
    return this.inscriptionRepository.save(
      this.inscriptionRepository.create(inscription),
    );
  }

  async delete(id, studentId): Promise<any> {
    return await this.inscriptionRepository.delete({ courseId: id, studentId });
  }
}
