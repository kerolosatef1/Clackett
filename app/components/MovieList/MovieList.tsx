import CardMovies from "../CardMovies/CardMovies";
import type { Movie } from "@/app/types/movie";

interface MoviesListProps {
  movies: Movie[];
}

export default function MoviesList({ movies }: MoviesListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {movies.map((mov) => (
        <CardMovies key={mov.id} mov={mov} />
      ))}
    </div>
  );
}
