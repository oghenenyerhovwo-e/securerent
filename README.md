'use client';

// module
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

// component
import {
  Input,
  ThemeToggle,
  LoadingBox,
} from '@/components';
import { motion } from 'framer-motion';

// functions and object
import { useSignupMutation } from '@/redux';

// css
import styles from './signup.module.css';


const SignupForm: React.FC = () => {
  const router = useRouter();

  const [signup, { isLoading: isSignUpLoading }] = useSignupMutation();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    fullName: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(prev => ({ ...prev, [e.target.name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password, fullName, confirmPassword } = formData;

    let newErrors = { email: '', password: '', fullName: '', confirmPassword: '' };

    if (!email.includes('@')) newErrors.email = 'Invalid email address';
    if (email.trim() === '') newErrors.email = 'Invalid email address';
    if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (password.trim() === '') newErrors.password = 'Invalid email address';
    if (fullName.trim() === '') newErrors.fullName = 'Full name is required';
    if (confirmPassword !== password) newErrors.confirmPassword = 'Password do not match';

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some(Boolean);
    if (!hasError) {
      try {
        const res = await signup({ fullName, email, password }).unwrap();
        toast.success(`Thank you ${res.fullName}. Account created successfully! Redirecting to login...`);
        router.push('/login')
      } catch (error: any) {
        toast.error(error?.data?.error || error?.message);
      } 
    } else {
      toast.error("Please fill all fields correctly");
    }
  };

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
          <h3 className={styles.title}>Create Account</h3>
          <form onSubmit={handleSubmit} className={styles.form}>
            <Input
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              error={errors.fullName}
            />
            <Input
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              type="email"
            />
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
            <button type="submit" className={styles.submit} disabled={isSignUpLoading}>
              {isSignUpLoading ? 'Creating Account...' : 'Sign Up'}
            </button>
            <div>
              {isSignUpLoading && <LoadingBox />}
            </div>
            <div className={styles.googleBtn}>Continue with Google</div>
          </form>
        </div>
      </motion.div>

      <motion.div
        className={styles.right}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >        
        <div>
          
        </div>
      </motion.div>
      <div className={styles.toggleContainer}>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default SignupForm;
