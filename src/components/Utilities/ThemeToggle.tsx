"use client"

// modules
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// components
import { FaMoon, FaSun } from 'react-icons/fa';

// css
import styles from "./themetoggle.module.css"

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === 'dark';

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label="Toggle Theme"
      style={{ background: 'none', border: 'none', cursor: 'pointer' }}
    >
      <motion.div
        key={theme}
        initial={{ rotate: 180, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={styles.toggleDiv}
      >
        {isDark ? <FaSun /> : <FaMoon />}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;