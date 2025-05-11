'use client';

// modules
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// components
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-toastify';

import { useGoogleLoginMutation } from "@/redux"

// styles
import styles from "./googlebutton.module.css"

declare global {
  interface Window {
    google: any;
  }
}

const GoogleButton = () => {
  const router = useRouter();
  const [googleLogin] = useGoogleLoginMutation();

  useEffect(() => {
    let timer: any;

    const loadGoogleScript = () => {
      const existingScript = document.getElementById('google-client-script');
      if (existingScript) return;

      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.id = 'google-client-script';
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogleSignIn;
      document.body.appendChild(script);
    };

    const initializeGoogleSignIn = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_ID!,
          callback: handleGoogleLogin,
          ux_mode: 'popup',
        });
      }
    };

    const handleGoogleLogin = async (response: any) => {      
        try {
          const result = await googleLogin({
            credential: {
              type: 'credential',
              token: response.credential,
            },
          }).unwrap();
      
          toast.success(`Welcome ${result?.user?.fullName}, Logged in successfully`);
          timer = setTimeout(() => {
            router.push('/dashboard');
          }, 5000);
        } catch (error: any) {
          console.error('Google login error:', error);
          toast.error(error?.data?.error || 'Google login failed');
        }
      };

    loadGoogleScript();

    return () => clearInterval(timer);
  }, [router]);

  const handleGoogleClick =() => {
    if (window.google) {
      window.google.accounts.id.prompt();
    } else {
      toast.error("Google sign-in not available right now.");
    }
  }


  return (
    <>
        <div id="google-signin-button" onClick={handleGoogleClick} className={styles.googleBtn}>
          <FcGoogle className={styles.googleIcon} />
          <span>Continue with Google</span>
        </div>
    </>
  )
};

export default GoogleButton;
