// components/Textarea.tsx

'use client';

import React from 'react';
import styles from './form.module.css';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  rows?: number;
  cols?: number;
}

const Textarea: React.FC<TextareaProps> = ({
  label,
  name,
  value,
  onChange,
  error,
  rows = 4,
  cols = 50,
  ...rest
}) => {
  return (
    <div className={styles.inputGroup}>
      <label htmlFor={name}>{label}</label>
      <div className={styles.inputWrapper}>
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          rows={rows}
          cols={cols}
          className={`${styles.input} ${styles.textarea} ${error ? styles.errorInput : ''}`}
          {...rest}
        />
      </div>
      {error && (
        <span className={styles.errorText}>{error}</span>
      )}
    </div>
  );
};

export default Textarea;
