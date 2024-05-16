import styles from './Header.module.css';

import logo from '@/assets/logo.svg';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <img src={logo} alt="TMDB logo" />
      </div>
    </header>
  );
}