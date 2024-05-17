import { Movie } from "@/api/tmdb";
import MovieCard, { MovieCardSkeleton } from "@/components/MovieCard";

import styles from './MovieList.module.css';

export default function MovieList({movies}: {movies?: Movie[]}) {
  return (
   <div className={styles.movieList}>
      {movies !== undefined ? movies.map((movie) => {
        return <MovieCard key={movie.id} movie={movie} />
      }) : <p>No movies found</p>}
   </div> 
  );
}

export function MovieListSkeleton({numberOfCards}: {numberOfCards: number}) {

  const cards = [];
  for (let i = 0; i < numberOfCards; i++) {
    cards.push(<MovieCardSkeleton key={i} />);
  }

  return (
    <div className={styles.movieList}>
      {cards}
    </div>
  );
}