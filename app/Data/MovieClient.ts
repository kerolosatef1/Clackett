'use client'
import type { MoviesResponse } from '@/app/types/movie';

const API_KEY = "4245547a1a9a3e8b5cd0e3921f725cfb";
const BASE_URL = 'https://api.themoviedb.org/3';

export async function searchMovies(
    query: string,
    page = 1
): Promise<MoviesResponse> {
    const res = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
            query
        )}&language=ar&page=${page}`,
        { cache: 'no-store' }
    );

    if (!res.ok) throw new Error('Search failed');
    return res.json();
}
