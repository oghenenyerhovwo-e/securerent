'use client';

// module
import React, { useState, useEffect } from 'react';

// component
import {
  ThemeToggle,
  SignupForm,
  LoginForm,
} from '@/components';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { BsDot } from 'react-icons/bs';

// functions and object
import { signupIllustrations } from "@/utils"

// css
import styles from './auth.module.css';


const AuthForm: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("login");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % signupIllustrations.length);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.left}
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.leftContainer}>
          <h5 className={styles.header}>SecureRent</h5>
          <div className={styles.tabsContainer}>
            <div
                className={`${styles.tab} ${activeTab === "login" ? styles.active : ""}`}
                onClick={() => setActiveTab("login")}
              >
                Login
            </div>
            <div
              className={`${styles.tab} ${activeTab === "signup" ? styles.active : ""}`}
              onClick={() => setActiveTab("signup")}
            >
              Sign Up
            </div>
          </div>
          {activeTab === "signup" ? <SignupForm /> : <LoginForm /> }
          
        </div>
      </motion.div>

      <motion.div
        className={styles.right}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >        
        <div className={styles.rightContent}>
          <div className={styles.carousel}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6 }}
                className={styles.carouselItem}
              >
                <Image
                  src={signupIllustrations[currentIndex].src}
                  alt="Illustration"
                  className={styles.illustration}
                  width={300}
                  height={300}
                />
                <p className={styles.carouselText}>
                  {signupIllustrations[currentIndex].text}
                </p>
              </motion.div>
            </AnimatePresence>
            <div className={styles.dots}>
              {signupIllustrations.map((_, index) => (
                <BsDot
                  key={index}
                  size={28}
                  className={index === currentIndex ? styles.activeDot : styles.inactiveDot}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
      <div className={styles.toggleContainer}>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default AuthForm;

