import movies from '../../movies.json' with { type: 'json' }
import crypto from 'node:crypto'

export class MovieModel {
  static async getAll ({ genre }) { // BL del filtrado de peliculas (desacoplando)
    if (genre) {
      const filteredMovies = movies.filter(
        movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
      )
      return filteredMovies
    }
    return movies
  }

  static async getById ({ id }) {
    const movie = movies.find(movie => movie.id === id)
    return movie
  }

  static async create ({ input }) {
    // en base de datos proximamente...
    const newMovie = {
      id: crypto.randomUUID(), // uuid v4
      ...input
    }

    movies.push(newMovie)

    return newMovie
  }

  static async delete ({ id, title }) {
    const movieIndex = movies.findIndex(movie => movie.id === id)

    if (movieIndex === -1) {
      return false
    }

    movies.splice(movieIndex, 1)
    return true
  }

  static async update ({ id, input }) {
    const movieIndex = movies.findIndex(movie => movie.id === id)

    if (movieIndex === -1) {
      return false
    }

    movies[movieIndex] = {
      ...movies[movieIndex],
      ...input
    }

    return movies[movieIndex]
  }
}
