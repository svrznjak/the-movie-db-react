import { Movie } from "@/api/thbd";

import styles from './MovieCard.module.css';

export default function MovieCard({movie}: {movie: Movie}) {

  // Create simple date string. TODO: Use date-fns
  const dateString = new Date(movie.release_date).toLocaleDateString() !== "Invalid Date" ? new Date(movie.release_date).toLocaleDateString() : '';

  return (
    <div className={styles.movieCard}>
      <img src={movie.poster_path !== null ? "https://image.tmdb.org/t/p/w500/"+movie.poster_path : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg'} alt={movie.title} />
      <div className={styles.content}>
        <div className={styles.rating}>{Math.round(movie.vote_average * 10)}</div>
        <h2>{movie.title}</h2>
        <span>{dateString}</span>
      </div>
    </div>
  );
}

export function MovieCardSkeleton() {
  return (
    <div className={styles.movieCard} >
      <div className={styles.skeletonImage}></div>
      <div className={styles.content}>
        <h2 style={{marginTop: '30px',  backgroundColor: '#eee'}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;</h2>
      </div>
    </div>
  );
}