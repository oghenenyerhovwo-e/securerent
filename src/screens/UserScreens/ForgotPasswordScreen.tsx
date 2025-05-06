'use client';

// module
import React, { useState } from 'react';
import { toast } from 'react-toastify';

// component
import {
  Input,
  LoadingBox,
  ThemeToggle,
  Carousel,
} from '@/components';
import Link from 'next/link';
import { motion } from 'framer-motion';

// functions and object
import { 
    useForgotPasswordMutation, 
} from '@/redux';

// functions and object
import { authIllustrations } from "@/utils"

// css
import styles from './forgotpassword.module.css';


const ForgotPasswordScreen: React.FC = () => {
        
        const [forgotPassword, { isLoading: isForgotPasswordLoading }] = useForgotPasswordMutation();
    
        const [formData, setFormData] = useState({
            email: '',
        });
        const [errors, setErrors] = useState({
            email: '',
        });
    
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
            setErrors(prev => ({ ...prev, [e.target.name]: '' }));
          };
    
        const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            const { email } = formData;
        
            let newErrors = { email: '' };
        
            if (!email.includes('@')) newErrors.email = 'Invalid email address';
            if (email.trim() === '') newErrors.email = 'Invalid email address';
        
            setErrors(newErrors);
        
            const hasError = Object.values(newErrors).some(Boolean);
            if (!hasError) {
              try {
                const res = await forgotPassword({ email }).unwrap();
                toast.success(`A password recovery email has been sent to ${res?.email}.`);

              } catch (error: any) {
                toast.error(error?.data?.error || error?.message);
              } 
            } else {
              toast.error("Please fill all fields correctly");
            }
        };

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
            <h3 className={styles.title}>Recover Password!</h3>
            <form onSubmit={handleSubmit} className={styles.form}>
                <Input
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    type="email"
                />
                <div className={styles.forgotPassword}>
                    <Link href="/users/auth">Back to Login</Link>
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={isForgotPasswordLoading}
                >
                    {isForgotPasswordLoading ? 'Processing..' : 'Recover Password'}
                </button>
                <div>
                    {isForgotPasswordLoading && <LoadingBox />}
                </div>
            </form>
            
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

export default ForgotPasswordScreen;

