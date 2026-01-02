import { Suspense } from "react";
import MoviesList from "@/app/components/MovieList/MovieList";
import Pagination from "@/app/components/Pagination/Pagination";
import { fetchPopularMovies } from "@/app/Data/MoviesServer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "كلاكيت - الأفلام الشعبية",
  description: "تصفح أحدث وأشهر الأفلام العالمية والعربية",
};

interface HomePageProps {
  searchParams: Promise<{ page?: string }>;
}

async function PopularMoviesContent({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const data = await fetchPopularMovies(currentPage);
  const totalPages = Math.min(data.total_pages, 500);

  return (
    <>
      <h1 className="text-white text-3xl font-bold mb-5">
        الأفلام الشعبية {currentPage > 1 && `- صفحة ${currentPage}`}
      </h1>

      {data.results.length > 0 ? (
        <>
          <MoviesList movies={data.results} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </>
      ) : (
        <h3 className="text-white text-center">لا يوجد أفلام</h3>
      )}
    </>
  );
}

export default function HomePage({ searchParams }: HomePageProps) {
  return (
    <div className="min-h-screen bg-black p-5">
      <Suspense fallback={<div className="text-white text-center py-20 text-xl font-bold">جاري تحميل الأفلام...</div>}>
        <PopularMoviesContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
