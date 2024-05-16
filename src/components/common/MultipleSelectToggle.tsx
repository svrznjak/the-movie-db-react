import styles from './MultipleSelectToggle.module.css';

import Toggle from '@/components/common/Toggle';

export default function MultipleSelectToggle({items, onToggle}: {items: {text: string, isToggled: boolean}[], onToggle: (index: number) => void}) {
  const toggles = items.map((item, index) => {
    return (
      <Toggle key={index} text={item.text} isToggled={item.isToggled} onToggle={() => onToggle(index)} />
    );
  });

  return (
    <div className={styles.multipleSelectToggle}>
      {toggles}
    </div>
  );
}