'use client';
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import MoviesList from "@/app/components/MovieList/MovieList";
import { searchMovies } from "@/app/Data/MovieClient";
import type { Movie } from "@/app/types/movie";
function SearchPageContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [movies, setMovies] = useState<Movie[]>([]);
    const [query, setQuery] = useState(searchParams.get('q') || '');
    const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) || 1);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const q = searchParams.get('q');
        const page = Number(searchParams.get('page')) || 1;

        if (q) {
            setQuery(q);
            setCurrentPage(page);
            performSearch(q, page);
        }
    }, [searchParams]);

    const performSearch = async (searchQuery: string, page = 1) => {
        if (!searchQuery.trim()) {
            setMovies([]);
            setTotalPages(0);
            return;
        }

        setIsLoading(true);
        try {
            const data = await searchMovies(searchQuery, page);
            setMovies(data.results);
            setTotalPages(Math.min(data.total_pages, 500));
        } catch (error) {
            console.error('Search error:', error);
            setMovies([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query)}&page=1`);
        }
    };

    const handlePageChange = (page: number) => {
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query)}&page=${page}`);
        }
    };

    return (
        <div className="min-h-screen bg-black p-5">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-white text-center text-3xl font-bold mb-5">البحث عن الأفلام</h2>

                <form onSubmit={handleSearch} className="mb-8">
                    <div className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="ابحث عن فيلم..."

                            className="w-full text-white  px-4 py-3 rounded-lg outline-none text-lg  bg-gray-900 focus:ring-2 focus:ring-red-500"
                        />
                        <button
                            type="submit"
                             className=" w-full sm:w-auto px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-bold text-base sm:text-lg active:scale-95
  "                        >
                            بحث
                        </button>
                    </div>
                </form>

                {isLoading ? (
                    <div className="text-white text-center text-xl">جاري البحث...</div>
                ) : movies.length > 0 ? (
                    <>
                        <p className="text-gray-400 mb-4">
                            تم العثور على نتائج للبحث عن: <span className="text-white font-bold">{searchParams.get('q')}</span>
                        </p>
                        <MoviesList movies={movies} />

                        {totalPages > 1 && (
                            <div className="flex justify-center items-center gap-2 mt-8">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                   السابق
                                </button>

                                <span className="px-4 py-2 text-white">
                                    صفحة {currentPage} من {totalPages}
                                </span>

                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    التالي 
                                </button>
                            </div>
                        )}
                    </>
                ) : query ? (
                    <p className="text-white text-center text-xl">لا توجد نتائج للبحث</p>
                ) : (
                    <p className="text-gray-400 text-center">ابدأ البحث عن الأفلام المفضلة لديك</p>
                )}
            </div>
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black p-5 text-white text-center">جاري التحميل...</div>}>
            <SearchPageContent />
        </Suspense>
    );
}