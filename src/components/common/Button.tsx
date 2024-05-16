
import styles from './Button.module.css';

export default function Button({text, onClick, disabled = false, stickToScreen=false, rounded=false}: {text: string, onClick: () => void, disabled?: boolean, stickToScreen?: boolean, rounded?: boolean}) {
  return (
    <button className={`${styles.button} ${stickToScreen ? styles.fixedFullWidth : ''} ${rounded ? styles.rounded : ''}`} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
}