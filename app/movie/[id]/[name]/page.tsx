import { Suspense } from "react";
import MovieDetails from "@/app/movie/[id]/[name]/MovieDetails";
import MovieDetailsSkeleton from "@/app/movie/[id]/[name]/MovieDetailsSkeleton";
import { fetchMovieDetails } from "@/app/Data/MoviesServer";
import type { Metadata } from "next";

interface PageProps {
    params: Promise<{ id: string; name: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;
    const movie = await fetchMovieDetails(id);

    return {
        title: `${movie.title || movie.original_title} - كلاكيت`,
        description: movie.overview || "تفاصيل الفيلم",
        openGraph: {
            title: movie.title || movie.original_title,
            description: movie.overview || "تفاصيل الفيلم",
            images: movie.poster_path
                ? [`https://image.tmdb.org/t/p/w500${movie.poster_path}`]
                : [],
        },
    };
}

async function MovieDetailsContent({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <MovieDetails id={id} />;
}

export default function MovieDetailsPage({ params }: PageProps) {
    return (
        <Suspense fallback={<MovieDetailsSkeleton />}>
            <MovieDetailsContent params={params} />
        </Suspense>
    );
}
