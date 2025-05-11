'use client';

// modules
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// components
// import {
//     LoadingBox,
//     Input,
// } from '@/components';
// import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';
// import { toast } from 'react-toastify';

// objects, functions and assets
// import { useVerifyEmailMutation, useResendVerificationEmailMutation } from '@/redux/';

// css
// import styles from '@/styles/confirmtoken.module.css';

const ShowListingScreen = ({ params }: { params: { _id: string } }) => {
//   const router = useRouter();

//   const [verifyEmail, { 
//     isLoading: isVerifyEmailLoading,
//     isSuccess: isVerifyEmailSuccess,
//     isError: isVerifyEmailError,
//   }] = useVerifyEmailMutation();
//   const [resendVerificationEmail, { 
//     isLoading: isResendVerificationEmailLoading,
//   }] = useResendVerificationEmailMutation();

//   const [email, setEmail] = useState('');

//   useEffect(() => {
//     const sendVerification = async () => {
//       try {
//         const res = await verifyEmail({ token: params.token }).unwrap();
//         toast.success(`Dear ${res.fullName}, you have been verified. Redirecting to login page...`);
//         setTimeout(() => {
//           router.push('/users/auth');
//         }, 3000);
//       } catch (error: any) {
//         toast.error(error?.data?.error || error?.message);
//       }
//     };

//     sendVerification();
//   }, [params.token, router, verifyEmail]);

  
//     const handleResendEmailVerification = async () => {
//         try {
//             const res = await resendVerificationEmail({ email }).unwrap();
//             toast.success(`Email has been resent to ${res.email} , verify the email, and then login...`);
//         } catch (error: any) {
//             toast.error(error?.data?.error || error?.message);
//         } 
//     };

  return (
    <div>
        ShowlIstingpage {params._id}
      {/* {(isVerifyEmailSuccess || isVerifyEmailError) && (
      <div className={styles.card}>
        {isVerifyEmailSuccess && (
            <>
              <AiOutlineCheckCircle className={styles.iconSuccess} />
              <h2 className={styles.title}>Email Verified!</h2>
              <p className={styles.text}>Your email has been successfully verified. Redirecting to login...</p>
            </>
          )
        }
        {isVerifyEmailError &&(
          <>
            <AiOutlineCloseCircle className={styles.iconError} />
            <h2 className={styles.title}>Invalid or Expired Token</h2>
            <p className={styles.text}>This verification link is not valid.</p>

            <div className={styles.resendSection}>
              <Input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className={"btn btn-accent"} onClick={handleResendEmailVerification}>
                Resend Verification Email
              </button>
            </div>
          </>
        )}
      </div>
      )}
      <div>
        {isVerifyEmailLoading && <LoadingBox />}
        {isResendVerificationEmailLoading && <LoadingBox />}
      </div> */}
    </div>
  );
}

export default ShowListingScreen 
