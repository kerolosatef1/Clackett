import type { MoviesResponse, MovieDetails } from '@/app/types/movie';

const API_KEY = "4245547a1a9a3e8b5cd0e3921f725cfb";
const BASE_URL = "https://api.themoviedb.org/3";

export async function fetchPopularMovies(page = 1): Promise<MoviesResponse> {
    const res = await fetch(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=ar&page=${page}`,
        {
            next: {
                revalidate: 3000,
                tags: ['popular-movies']
            }
        }
    );

    if (!res.ok) {
        throw new Error('Failed to fetch popular movies');
    }

    return res.json();
}

export async function fetchMovieDetails(id: string): Promise<MovieDetails> {
    const res = await fetch(
        `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=ar`,
        {
            next: {
                revalidate: 2000,
                tags: ['movie-details', `movie-${id}`]
            }
        }
    );

    if (!res.ok) {
        throw new Error('Failed to fetch movie details');
    }

    return res.json();
}

export async function searchMovies(query: string, page = 1): Promise<MoviesResponse> {
    const res = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=ar&page=${page}`,
        {
            cache: 'no-store'
        }
    );

    if (!res.ok) {
        throw new Error('Failed to search movies');
    }

    return res.json();
}
