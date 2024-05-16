import { Movie } from "@/api/thbd";

import styles from './MovieCard.module.css';

export default function MovieCard({movie}: {movie: Movie}) {
  return (
    <div className={styles.movieCard}>
      <img src={movie.poster_path !== null ? "https://image.tmdb.org/t/p/w500/"+movie.poster_path : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg'} alt={movie.title} />
      <div className={styles.content}>
      <div className={styles.rating}>{Math.round(movie.vote_average * 10)}</div>
      <h2>{movie.title}</h2>
      <span>{new Date(movie.release_date).toLocaleDateString()}</span>
      </div>
    </div>
  );
}