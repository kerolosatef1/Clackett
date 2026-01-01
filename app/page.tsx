import MoviesList from "@/app/components/MovieList/MovieList";
import ServerPagination from "@/app/components/ServerPagination/Pagination";
import { fetchPopularMovies } from "@/app/Data/movies";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "كلاكيت - الأفلام الشعبية",
  description: "تصفح أحدث وأشهر الأفلام العالمية والعربية",
};

interface HomePageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;

  const data = await fetchPopularMovies(currentPage);
  const movies = data.results;
  const totalPages = Math.min(data.total_pages, 500); // TMDB API limit

  return (
    <div className="min-h-screen bg-black p-5">
      <h1 className="text-white text-3xl font-bold mb-5">
        الأفلام الشعبية {currentPage > 1 && `- صفحة ${currentPage}`}
      </h1>

      {movies.length > 0 ? (
        <>
          <MoviesList movies={movies} />
          <ServerPagination
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </>
      ) : (
        <h3 className="text-white text-center">لا يوجد أفلام</h3>
      )}
    </div>
  );
}
