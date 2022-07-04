import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth.module';
import { CourseModule } from './modules/course.module';
import { InscriptionModule } from './modules/inscription.module';
import { StudentModule } from './modules/student.module';

@Module({
  imports: [
    StudentModule,
    AuthModule,
    CourseModule,
    InscriptionModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      synchronize: true,
      port: 5432,
      username: 'usr_dotto',
      password: 'usr_dotto',
      database: 'db_api',
      entities: ['dist/**/*.model.js'],
    }),
  ],
})
export class AppModule {}
