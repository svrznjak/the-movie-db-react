import { Movie } from "@/api/thbd";
import MovieCard from "@/components/MovieCard";

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