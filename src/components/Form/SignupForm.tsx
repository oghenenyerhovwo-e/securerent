'use client';

// module
import React, { useState } from 'react';
import { toast } from 'react-toastify';

// component
import {
  Input,
  LoadingBox,
} from '@/components';
import { FcGoogle } from 'react-icons/fc';

// functions and object
import { useSignupMutation } from '@/redux';

// css
import styles from './sign.module.css';

const SignupForm = () => {    
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
            toast.success(`Thank you ${res.fullName}. Account created successfully! An email has been sent to the address you provided, verify the email, then login...`);
          } catch (error: any) {
            toast.error(error?.data?.error || error?.message);
          } 
        } else {
          toast.error("Please fill all fields correctly");
        }
    };

    return (
        <>
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
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={isSignUpLoading}
                >
                    {isSignUpLoading ? 'Creating Account...' : 'Sign Up'}
                </button>
                <div>
                    {isSignUpLoading && <LoadingBox />}
                </div>
                <div className={styles.orDivider}>
                    <span className={styles.line}></span>
                    <h5 className={styles.text}>or</h5>
                    <span className={styles.line}></span>
                </div>
                <div className={styles.googleBtn}>
                    <FcGoogle className={styles.googleIcon} />
                    Continue with Google
                </div>
            </form>
        </>
    )
}

export default SignupForm