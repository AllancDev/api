import { InscriptionModel } from 'src/models/inscription.model';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(InscriptionModel)
export class InscriptionRepository extends Repository<InscriptionModel> {}
