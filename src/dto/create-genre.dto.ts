import { IsString } from 'class-validator'

export class CreateGenreDto {
  @IsString({ message: 'name should be string' })
  name: string
}
