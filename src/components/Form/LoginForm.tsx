'use client';

// module
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

// component
import {
  Input,
  LoadingBox,
  GoogleButton,
} from '@/components';
import Link from 'next/link';

// functions and object
import { 
    useLoginMutation, 
    useResendVerificationEmailMutation,
} from '@/redux';

// css
import styles from './sign.module.css';

const LoginForm = () => {
    const router = useRouter();
    
    const [login, { isLoading: isLoginLoading }] = useLoginMutation();
    const [resendVerificationEmail, { isLoading: isResendVerificationEmailLoading }] = useResendVerificationEmailMutation();

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

      const handleResendEmailVerification = async () => {
        const { email } = formData;
        try {
            const res = await resendVerificationEmail({ email }).unwrap();
            toast.success(`Email has been resent to ${res.email} , verify the email, and then login...`);
        } catch (error: any) {
            toast.error(error?.data?.error || error?.message);
        } 
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { email, password } = formData;
    
        let newErrors = { email: '', password: '' };
    
        if (!email.includes('@')) newErrors.email = 'Invalid email address';
        if (email.trim() === '') newErrors.email = 'Invalid email address';
        if (password.trim() === '') newErrors.password = 'Invalid password ';
    
        setErrors(newErrors);
    
        const hasError = Object.values(newErrors).some(Boolean);
        if (!hasError) {
          try {
            const res = await login({ email, password }).unwrap();
            toast.success(`Welcome back ${res?.user?.fullName}.`);
            toast.success(`Redirecting to dashboard...`);
            setTimeout(() => {
                router.push('/dashboard');
              }, 5000);
          } catch (error: any) {
            if((error?.data?.error || error?.message) === "Only verified users can login"){
                toast.error(
                    <div>
                      <h5 className='spacing-sm'>Account Created!</h5>
                      <p className='spacing-sm'>Only verified users can login</p>
                      <p className='spacing-sm'>Check your email inbox/spams for link to verify</p>
                      <p>Can't find email? click <span className={styles.resendEmail} onClick={handleResendEmailVerification}>Resend Email</span> </p>
                    </div>,
                    { autoClose: 30000 }
                  );
            } else {
                toast.error(error?.data?.error || error?.message);
            }
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
                <div className={styles.forgotPassword}>
                    <Link href="/users/password/forget">Forgot Password?</Link>
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={isLoginLoading}
                >
                    {isLoginLoading ? 'Logging in...' : 'Log In'}
                </button>
                <div>
                    {isLoginLoading && <LoadingBox />}
                    {isResendVerificationEmailLoading && <LoadingBox />}
                </div>
                <div className={styles.orDivider}>
                    <span className={styles.line}></span>
                    <h5 className={styles.text}>or</h5>
                    <span className={styles.line}></span>
                </div>
                <GoogleButton />
            </form>
        </>
    )
}

export default LoginForm