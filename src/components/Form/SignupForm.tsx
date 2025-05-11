'use client';

// module
import React, { useState } from 'react';
import { toast } from 'react-toastify';

// component
import {
  Input,
  LoadingBox,
  GoogleButton,
} from '@/components';

// functions and object
import { useSignupMutation } from '@/redux';
import { validateInputField, signUpRequiredFields } from "@/utils"

// css
import styles from '@/styles/formscreen.module.css';

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
        const {hasError, newErrors} = validateInputField(signUpRequiredFields, formData)
        
        if (hasError) {
            setErrors(newErrors)
            return toast.error("Please fill all fields correctly")
        }

        try {
            const res = await signup({ 
                fullName: formData.fullName, 
                email: formData.email, 
                password: formData.password, 
            }).unwrap();
            toast.success(`Secure Rent greets you ${res.fullName}. An email has been sent to the address you provided, verify the email, and then login...`);
        } catch (error: any) {
            toast.error(error?.data?.error || error?.message);
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
                <GoogleButton />
                <div className={styles.orDivider}>
                    <span className={styles.line}></span>
                    <h5 className={styles.text}>or</h5>
                    <span className={styles.line}></span>
                </div>
                
            </form>
        </>
    )
}

export default SignupForm