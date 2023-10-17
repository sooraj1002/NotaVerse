import { IsString } from 'class-validator';

export class updateDto {
  @IsString()
  title: string;

  @IsString()
  category: string;

  @IsString()
  content: string;
}
