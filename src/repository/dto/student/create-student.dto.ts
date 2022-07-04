import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateStudentDto {
  @IsNotEmpty({
    message: 'Informe um endereço de email.',
  })
  @IsEmail(
    {},
    {
      message: 'Informe um endereço de email válido.',
    },
  )
  @MaxLength(200, {
    message: 'O endereço de email deve ter no máximo 200 caracteres',
  })
  email: string;

  @IsNotEmpty({
    message: 'Informe o nome do aluno',
  })
  @MaxLength(200, {
    message: 'O nome do aluno deve conter no máximo 200 caracteres.',
  })
  name: string;

  @IsNotEmpty({
    message: 'Informe uma senha.',
  })
  @MinLength(6, {
    message: 'A senha deve conter no mínimo 6 caracteres.',
  })
  password: string;

  @IsNotEmpty({
    message: 'Informe a confirmação da senha',
  })
  @MinLength(6, {
    message: 'A confirmação de senha ter no mínima 6 caracteres.',
  })
  passwordConfirmation: string;
}
