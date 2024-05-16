import styles from './Toggle.module.css';

export default function Toggle({text, isToggled, onToggle}: {text: string, isToggled: boolean, onToggle: () => void}) {
  return (
    <button className={`${styles.toggle} ${isToggled ? styles.toggled : styles.untoggled}`} onClick={onToggle}>
      {text}
    </button>
  );
}