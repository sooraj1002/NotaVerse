import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class createDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  category: string;
}
