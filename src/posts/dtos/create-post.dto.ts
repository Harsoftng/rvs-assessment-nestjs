import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { TextHelper } from '../../shared/text.helper';

export class CreatePostDto {
  @Transform((v) => TextHelper.trim(v.value))
  @Transform((v) => TextHelper.escapeSpecialCharacters(v.value))
  @Transform((v) => TextHelper.sanitize(v.value))
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(200)
  title!: string;

  @Transform((v) => TextHelper.trim(v.value))
  @Transform((v) => TextHelper.escapeSpecialCharacters(v.value))
  @Transform((v) => TextHelper.sanitize(v.value))
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  body!: string;
}
