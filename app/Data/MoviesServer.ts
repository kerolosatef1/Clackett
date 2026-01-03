import { cacheLife, cacheTag } from 'next/cache';
import type { MoviesResponse, MovieDetails } from '@/app/types/movie';
import { cache } from 'react';

const API_KEY = "4245547a1a9a3e8b5cd0e3921f725cfb";
const BASE_URL = 'https://api.themoviedb.org/3';


export async function fetchPopularMovies(page = 1): Promise<MoviesResponse> {
    'use cache';
    cacheTag('popular-movies');
    cacheLife('days');

    const res = await fetch(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=ar&page=${page}`,
         {
    cache: "force-cache",
}
    );

    if (!res.ok) throw new Error('Failed to fetch popular movies');
    return res.json();
}


export const fetchMovieDetails = cache(
  async (id: string): Promise<MovieDetails> => {
    'use cache';
    cacheTag('movie-details', `movie-${id}`);
    cacheLife('days');

    const res = await fetch(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=ar`,
      { cache: "force-cache" }
    );

    if (!res.ok) throw new Error('Failed to fetch movie details');
    return res.json();
  }
);
