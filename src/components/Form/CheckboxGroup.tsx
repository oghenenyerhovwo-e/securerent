// components/CheckboxGroup.tsx
import React from 'react';
import styles from "./form.module.css";

interface CheckboxGroupProps {
  label?: string;
  name: string;
  value: string[]; // Array of selected values
  options: string[]; // List of checkbox values
  onChange: (name: string, value: string[]) => void;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  label,
  name,
  value,
  options,
  onChange,
}) => {
  const handleCheckboxChange = (option: string) => {
    const newValue = value.includes(option)
      ? value.filter((val) => val !== option)
      : [...value, option];
    onChange(name, newValue);
  };

  return (
    <div className={styles.checkBoxGroupContainer}>
      {label && <label>{label}</label>}
      <div className={styles.checkBoxGroupWrapper}>
          {options.map((option, index) => (
            <div key={index} className={styles.checkBoxContainer}>
                <label 
                  key={option} 
                  htmlFor={`${name}-${option}`} 
                >
                <input
                    type="checkbox"
                    id={`${name}-${option}`}
                    name={name}
                    value={option}
                    checked={value.includes(option)}
                    onChange={() => handleCheckboxChange(option)}
                />
                  {option}
                </label>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CheckboxGroup;
