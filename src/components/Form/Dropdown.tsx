'use client';

// module
import React from 'react';

// css
import styles from './form.module.css';

interface DropdownProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
  options: { label: string; value: string | number }[];
}

const Dropdown: React.FC<DropdownProps> = ({ 
  label, 
  name, 
  value, 
  onChange, 
  error, options, ...rest 
}) => {
  return (
    <div className={styles.inputGroup}>
      {label && <label htmlFor={name}>{label}</label>}
      <div className={styles.inputWrapper}>
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={`${styles.input} ${error ? styles.errorInput : ''}`}
          {...rest}
        >
          <option value="">Select an option</option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};

export default Dropdown;
