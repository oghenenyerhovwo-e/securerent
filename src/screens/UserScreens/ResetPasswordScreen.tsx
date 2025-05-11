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
import { motion } from 'framer-motion';

// functions and object
import { 
    useResetPasswordMutation, 
} from '@/redux';

// functions and object
import { authIllustrations } from "@/utils"
import { validateInputField, resetPasswordRequiredFields } from "@/utils"

// css
import styles from '@/styles/formscreen.module.css';


const ResetPasswordScreen = ({ params }: { params: { token: string } }) => {
        const [resetPassword, { isLoading: isResetPasswordLoading }] = useResetPasswordMutation();
    
        const [formData, setFormData] = useState({
            password: '',
            confirmPassword: '',
        });
        const [errors, setErrors] = useState({
            password: '',
            confirmPassword: '',
        });
    
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
            setErrors(prev => ({ ...prev, [e.target.name]: '' }));
          };
    
        const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();

            const {hasError, newErrors} = validateInputField(resetPasswordRequiredFields, formData)
                    
            if (hasError) {
                setErrors(newErrors)
                return toast.error("Please fill all fields correctly")
            }

            try {
                const res = await resetPassword({ password: formData.password, token: params?.token }).unwrap();
                toast.success(`Password has been changed for ${res?.email}.`);

            } catch (error: any) {
                toast.error(error?.data?.error || error?.message);
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
                    label="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    error={errors.password}
                    type="password"
                />
                <Input
                    label="Confirm Password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={errors.confirmPassword}
                    type="password"
                />
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={isResetPasswordLoading}
                >
                    {isResetPasswordLoading ? 'Processing..' : 'Recover Password'}
                </button>
                <div>
                    {isResetPasswordLoading && <LoadingBox />}
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

export default ResetPasswordScreen;

