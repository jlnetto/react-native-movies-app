import omdbApi from './client'

export const getMovies = queryMoviesByTitle => (
  omdbApi.get(null, { params: { s: queryMoviesByTitle }})
  .then(data => data.data.Search)
  .catch(err => console.log(err))
)

export const searchMovies = searchParams => (
  omdbApi.get(null, { params: { s: searchParams }})
  .then(data => data.data)
  .catch(err => console.log(err))
)

export const movieDetails = movieId => (
  omdbApi.get(null, { params: { i: movieId }})
  .then(data => data.data )
  .catch(err => console.log(err))
)
