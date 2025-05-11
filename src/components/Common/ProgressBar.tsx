import React from 'react';
import styles from './progressbar.module.css';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className={styles.progressWrapper}>
      <div className={styles.progressBar} style={{ width: `${progress}%` }} />
    </div>
  );
};

export default ProgressBar;
