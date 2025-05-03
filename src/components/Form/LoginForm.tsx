'use client';

// module
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

// component
import {
  Input,
  LoadingBox,
} from '@/components';
import { FcGoogle } from 'react-icons/fc';

// functions and object
import { useLoginMutation } from '@/redux';

// css
import styles from './sign.module.css';

const LoginForm = () => {
    const router = useRouter();
    
    const [login, { isLoading: isLoginLoading }] = useLoginMutation();
    
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
        setErrors(prev => ({ ...prev, [e.target.name]: '' }));
      };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { email, password } = formData;
    
        let newErrors = { email: '', password: '' };
    
        if (!email.includes('@')) newErrors.email = 'Invalid email address';
        if (email.trim() === '') newErrors.email = 'Invalid email address';
        if (password.trim() === '') newErrors.password = 'Invalid email address';
    
        setErrors(newErrors);
    
        const hasError = Object.values(newErrors).some(Boolean);
        if (!hasError) {
          try {
            const res = await login({ email, password }).unwrap();
            toast.success(`Thank you ${res.fullName}. Account created successfully! Redirecting to login...`);
            setTimeout(() => {
                router.push('/dashboard');
              }, 5000);
          } catch (error: any) {
            toast.error(error?.data?.error || error?.message);
          } 
        } else {
          toast.error("Please fill all fields correctly");
        }
    };

    return (
        <>
            <h3 className={styles.title}>Welcome Back!</h3>
            <form onSubmit={handleSubmit} className={styles.form}>
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
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={isLoginLoading}
                >
                    {isLoginLoading ? 'Logging in...' : 'Log In'}
                </button>
                <div>
                    {isLoginLoading && <LoadingBox />}
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

export default LoginForm