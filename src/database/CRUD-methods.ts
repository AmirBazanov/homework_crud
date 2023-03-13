import { PrismaClient } from '@prisma/client'
import { CreateMovieDto } from '../dto/create-movie.dto'
import { createErrors } from './prisma-error-handler'

export class DB {
  private prisma
  constructor() {
    this.prisma = new PrismaClient()
  }
  public createMovie = async (dto: CreateMovieDto) => {
    let result
    try {
      result = await this.prisma.movies.create({
        data: {
          title: dto.title,
          production_date: new Date(dto.production_date),
          genres: {
            connectOrCreate: dto.genres.map(genre => {
              return {
                where: {
                  name: genre,
                },
                create: {
                  name: genre,
                },
              }
            }),
          },
        },
        select: {
          movie_id: true,
          title: true,
          production_date: true,
          genres: true,
        },
      })
    } catch (err: any) {
      createErrors(err)
    }
    return result
  }

  public deleteMovie = async (title: string) => {
    let result
    try {
      result = await this.prisma.movies.delete({
        where: { title: title },
      })
    } catch (err: any) {
      throw { error_code: err.code, message: err.meta }
    }
    return result
  }

  public updateMovie = async (dto: CreateMovieDto) => {
    let result
    try {
      result = await this.prisma.movies.update({
        data: {
          title: dto.title,
          production_date: new Date(dto.production_date),
          genres: {
            connectOrCreate: dto.genres.map(genre => {
              return {
                where: {
                  name: genre,
                },
                create: {
                  name: genre,
                },
              }
            }),
          },
        },
        select: {
          movie_id: true,
          title: true,
          production_date: true,
          genres: true,
        },
        where: { title: dto.title },
      })
    } catch (err: any) {
      throw { error_code: err.code, message: err.meta }
    }
    return result
  }

  public findMovie = async (title: string) => {
    //TODO Find by DTO title:string, add find by genres, production date range
    let result
    try {
      result = await this.prisma.movies.findFirst({
        where: { title: title },
      })
    } catch (err: any) {
      throw { error_code: err.code, message: err.meta }
    }
    return result
  }
}
