import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InscriptionController } from 'src/controllers/inscription.controller';
import { InscriptionModel } from 'src/models/inscription.model';
import { InscriptionService } from 'src/services/inscription.service';

@Module({
  imports: [TypeOrmModule.forFeature([InscriptionModel])],
  controllers: [InscriptionController],
  providers: [InscriptionService],
})
export class InscriptionModule {}
