'use client';

// module
import React from 'react';

// components
import { motion } from 'framer-motion';

// css
import styles from './loading.module.css';

interface LoadingBoxProps {
  message?: string;
}

const Loading: React.FC = ({ message = 'Loading...' }: LoadingBoxProps) => {
  return (
    <motion.div 
      className={styles.loadingWrapper}
      initial={{ opacity: 0}}
      animate={{ opacity: 0.6}}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className={styles.loader}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, ease: "linear", duration: 1 }}
      />
      <h5>{message}</h5>
    </motion.div>
  );
};

export default Loading;
