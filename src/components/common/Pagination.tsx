import Button from "./Button";

import styles from './Pagination.module.css';

export default function Pagination({page, totalPages, onPageChange}: {page: number, totalPages: number, onPageChange: (page: number) => void}) {
  return (
    <div className={styles.pagination}>
      <Button text="Previous" onClick={() => onPageChange(page - 1)} disabled={page === 1} />
      <span>{page} of {totalPages}</span>
      <Button text="Next" onClick={() => onPageChange(page + 1)} disabled={page === totalPages} />
    </div>
  );
}