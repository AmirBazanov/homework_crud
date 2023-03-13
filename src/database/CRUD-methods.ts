import { PrismaClient } from '@prisma/client'
import { CreateMovieDto } from '../dto/create-movie.dto'
import { createErrors } from './prisma-error-handler'
import { CreateGenreDto } from '../dto/create-genre.dto'

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

  public deleteMovie = async (id: number) => {
    let result
    try {
      result = await this.prisma.movies.delete({
        where: { movie_id: BigInt(id) },
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

  public getMovies = async (id?: number) => {
    let result
    try {
      result = await this.prisma.movies.findMany(
        id
          ? {
              where: { movie_id: BigInt(id) },
            }
          : undefined
      )
    } catch (err: any) {
      console.log(err)
      throw { error_code: err.code, message: err.meta }
    }
    if (result) {
      return result
    }
    throw { error_code: 404, message: 'Such title doesn`t exist' }
  }

  public createGenre = async (dto: CreateGenreDto) => {
    let result
    try {
      result = await this.prisma.genres.create({
        data: {
          name: dto.name,
        },
        select: {
          genre_id: true,
          name: true,
          movies: true,
        },
      })
    } catch (err: any) {
      createErrors(err)
    }
    return result
  }

  public deleteGenre = async (id: number) => {
    let result
    try {
      result = await this.prisma.genres.delete({
        where: { genre_id: BigInt(id) },
      })
    } catch (err: any) {
      throw { error_code: err.code, message: err.meta }
    }
    return result
  }

  public updateGenre = async (dto: CreateGenreDto) => {
    let result
    try {
      result = await this.prisma.genres.update({
        data: {
          name: dto.name,
        },
        select: {
          genre_id: true,
          name: true,
        },
        where: { name: dto.name },
      })
    } catch (err: any) {
      throw { error_code: err.code, message: err.meta }
    }
    return result
  }

  public getGenres = async (id?: number) => {
    let result
    try {
      result = await this.prisma.genres.findMany(
        id
          ? {
              where: { genre_id: BigInt(id) },
            }
          : undefined
      )
    } catch (err: any) {
      console.log(err)
      throw { error_code: err.code, message: err.meta }
    }
    if (result) {
      return result
    }
    throw { error_code: 404, message: 'Such genre_id doesn`t exist' }
  }
}
