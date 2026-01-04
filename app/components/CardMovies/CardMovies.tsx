import Image from "next/image";
import Link from "next/link";
import type { Movie } from "@/app/types/movie";

interface CardMoviesProps {
  mov: Movie;
}

export default function CardMovies({ mov }: CardMoviesProps) {
  return (
    <section className="movie-card">
      <Link
        href={`/movie/${mov.id}/${encodeURIComponent(mov.original_title)}`}
        className="relative block w-full h-[500px] rounded-xl overflow-hidden shadow-lg group"
      >
        {mov.poster_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/w500${mov.poster_path}`}
            alt={mov.title || mov.original_title}
            width={400}
            height={600}
            sizes="(max-width: 768px) 100vw, 400px"
            quality={75}
            className=" object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center text-white">
            <span>لا توجد صورة</span>
          </div>
        )}
      </Link>
    </section>
  );
}
