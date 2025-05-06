'use client';

// module
import React, { useState } from 'react';

// components
import { FiEye, FiEyeOff } from 'react-icons/fi';

// css
import styles from './form.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
}

const Input: React.FC<InputProps> = ({ label, name, value, onChange, error, type = 'text', ...rest }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  const handleTogglePassword = () => setShowPassword(prev => !prev);

  return (
    <div className={styles.inputGroup}>
      <label htmlFor={name}>{label}</label>
      <div className={styles.inputWrapper}>
        <input
          id={name}
          name={name}
          type={isPassword ? (showPassword ? 'text' : 'password') : type}
          value={value}
          onChange={onChange}
          className={`${styles.input} ${error ? styles.errorInput : ''}`}
          {...rest}
        />
        {isPassword && (
          <div className={styles.eyeIcon} onClick={handleTogglePassword}>
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </div>
        )}
      </div>
      {error && (
        <span className={styles.errorText}>{error}</span>
      )}
    </div>
  );
};

export default Input;
