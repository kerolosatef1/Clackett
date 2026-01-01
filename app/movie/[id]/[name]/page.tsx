import Image from "next/image";
import { fetchMovieDetails } from "@/app/Data/movies";
import type { Metadata } from "next";

interface MovieDetailsPageProps {
    params: Promise<{ id: string; name: string }>;
}

export async function generateMetadata({ params }: MovieDetailsPageProps): Promise<Metadata> {
    const { id } = await params;
    const movie = await fetchMovieDetails(id);

    return {
        title: `${movie.title || movie.original_title} - كلاكيت`,
        description: movie.overview || "تفاصيل الفيلم",
        keywords: [
            movie.title,
            movie.original_title,
            ...movie.genres.map(g => g.name),
            'أفلام',
            'سينما'
        ],
        openGraph: {
            title: movie.title || movie.original_title,
            description: movie.overview || "تفاصيل الفيلم",
            images: movie.poster_path
                ? [`https://image.tmdb.org/t/p/w500${movie.poster_path}`]
                : [],
            type: "video.movie",
            locale: "ar_AR",
        },
        twitter: {
            card: "summary_large_image",
            title: movie.title || movie.original_title,
            description: movie.overview || "تفاصيل الفيلم",
            images: movie.poster_path
                ? [`https://image.tmdb.org/t/p/w500${movie.poster_path}`]
                : [],
        },
    };
}

export default async function MovieDetailsPage({ params }: MovieDetailsPageProps) {
    const { id } = await params;
    const movie = await fetchMovieDetails(id);

    return (
        <div className="min-h-screen bg-black text-white p-5">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold mb-6">
                    {movie.title || movie.original_title}
                </h1>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Poster */}
                    <div className="flex justify-center md:justify-start">
                        {movie.poster_path ? (
                            <Image
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                width={400}
                                height={600}
                                alt={movie.title || movie.original_title}
                                className="rounded-lg shadow-2xl"
                                priority
                            />
                        ) : (
                            <div className="w-[400px] h-[600px] bg-gray-800 rounded-lg flex items-center justify-center">
                                <span className="text-gray-400">لا توجد صورة</span>
                            </div>
                        )}
                    </div>

                    {/* Details */}
                    <div className="space-y-4">
                        {movie.tagline && (
                            <p className="text-xl italic text-gray-300">"{movie.tagline}"</p>
                        )}

                        <div className="space-y-3">
                            <InfoRow label="اسم الفيلم الأصلي" value={movie.original_title} />
                            <InfoRow label="اللغة الأصلية" value={movie.original_language.toUpperCase()} />
                            <InfoRow
                                label="التقييم"
                                value={`${movie.vote_average.toFixed(1)} / 10 (${movie.vote_count.toLocaleString('ar-EG')} تقييم)`}
                            />
                            <InfoRow label="سنة الإصدار" value={movie.release_date} />
                            <InfoRow
                                label="المدة"
                                value={movie.runtime ? `${movie.runtime} دقيقة` : "غير محدد"}
                            />
                            <InfoRow
                                label="النوع"
                                value={movie.genres?.map((g) => g.name).join("، ") || "غير محدد"}
                            />
                            <InfoRow label="الحالة" value={movie.status} />
                        </div>

                        {movie.overview && (
                            <div className="mt-6">
                                <h2 className="text-2xl font-bold mb-3">نبذة عن الفيلم</h2>
                                <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
                            </div>
                        )}

                        {movie.homepage && (
                            <div className="mt-6">
                                <a
                                    href={movie.homepage}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                                >
                                    زيارة الموقع الرسمي
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function InfoRow({ label, value }: { label: string; value: string }) {
    return (
        <p className="text-lg">
            <span className="font-bold text-red-500">{label}:</span>{" "}
            <span className="text-gray-200">{value}</span>
        </p>
    );
}
