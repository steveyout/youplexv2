///tmdb
import { MovieDb } from 'moviedb-promise';

export default async function handler(req, res) {
  try {
    const moviedb = new MovieDb(process.env.TMDB_API_KEY);
    const movies = await moviedb.movieNowPlaying()
    res.status(200).json(movies.results);
  } catch (error) {
    console.error('failed to load data');
    res.status(500).json({ error: 'failed to load data' });
  }
}
