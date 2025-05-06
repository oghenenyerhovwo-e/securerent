'use client';

// module
import React, { useState } from 'react';

// component
import {
  ThemeToggle,
  SignupForm,
  LoginForm,
  Carousel,
} from '@/components';
import { motion } from 'framer-motion';

// functions and object
import { authIllustrations } from "@/utils"

// css
import styles from './auth.module.css';


const AuthScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <>
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
            <Carousel items={authIllustrations} />
          </div>
        </motion.div>
        <div className={styles.toggleContainer}>
          <ThemeToggle />
        </div>
      </div>
    </>
  );
};

export default AuthScreen;

