import {
  IsArray,
  IsDateString,
  IsString,
  ValidateNested,
} from 'class-validator'

export class CreateMovieDto {
  @IsString({ message: 'title should be string' })
  title: string
  @IsDateString()
  production_date: Date

  @IsArray()
  @ValidateNested()
  @IsString({ each: true, message: 'genres should be array of strings' })
  genres: string[]
}
