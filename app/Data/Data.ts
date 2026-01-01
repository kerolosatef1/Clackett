const API_KEY = "4245547a1a9a3e8b5cd0e3921f725cfb";

// SSG / SSR
export async function fetchPopularMovies(page = 1) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ar&page=${page}`,
    { cache: 'force-cache' }
  );
  return res.json();
}

export async function fetchMovieDetails(id: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=ar`,
    { cache: 'force-cache' }
  );
  return res.json();
}

// CSR
export async function searchMovies(query: string, page = 1) {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&language=ar&page=${page}`,
    { cache: 'no-store' }
  );
  return res.json();
}
