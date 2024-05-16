import styles from './Dropdown.module.css';

export default function Dropdown({options, selectedOption, onOptionChange}: {options: { [key: string]: string }, selectedOption: string, onOptionChange: (option: string) => void}) {
  const dropdownOptions = Object.keys(options).map((option) => {
    return (
      <option key={option} value={option}>{options[option]}</option>
    );
  });
  dropdownOptions.unshift(<option key="default" value="">None selected</option>);

  return (
    <select className={styles.dropdown} value={selectedOption} onChange={(e) => onOptionChange(e.target.value)}>
      {dropdownOptions}
    </select>
  );
}