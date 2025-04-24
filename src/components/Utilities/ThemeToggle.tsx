'use client';

// modules
import React from 'react';
import { useAppSelector, useAppDispatch } from '@/redux';

// components
import { FaMoon, FaSun } from 'react-icons/fa';

// functions and objects
import { 
    toggleTheme,
} from '@/redux/';

// css
import styles from './themetoggle.module.css';

const ThemeToggle = () => {
  const theme = useAppSelector((state) => state.theme.mode);
  const dispatch = useAppDispatch();

  return (
    <button
      className={styles.toggle}
      onClick={() => dispatch(toggleTheme())}
      aria-label="Toggle Theme"
    >
      {theme === 'light' ? <FaMoon /> : <FaSun />}
    </button>
  );
};

export default ThemeToggle;
