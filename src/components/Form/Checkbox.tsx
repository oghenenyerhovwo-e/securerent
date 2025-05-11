// components/Checkbox.tsx
import React from 'react';

// styles
import styles from "./form.module.css"

interface CheckboxProps {
  label: string;
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, name, checked, onChange }) => {
  return (
    <div className={styles.checkBoxContainer}>
      <label htmlFor={name}>
        <input
          type="checkbox"
          id={name}
          name={name}
          checked={checked}
          onChange={onChange}
        />
        <span>{label}</span>
      </label>
    </div>
  );
};

export default Checkbox;
