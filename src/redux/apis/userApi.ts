import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: "userApi",
  refetchOnFocus: true,
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/users`,
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    identifyUser: builder.query<any, void>({
      query: () => '/me',
      providesTags: ['User'],
    }),

    login: builder.mutation<any, { email: string; password: string }>({
      query: (body) => ({
        url: '/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),

    googleLogin: builder.mutation<any, { credential: { type: string; token: string } }>({
      query: (body) => ({
        url: '/google',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    

    signup: builder.mutation<any, { fullName: string; email: string; password: string }>({
      query: (body) => ({
        url: '/signup',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),

    resendVerificationEmail: builder.mutation<any, { email: string }>({
      query: (body) => ({
        url: '/resendVerificationEmail',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),

    verifyEmail: builder.mutation<any, { token: string }>({
      query: (body) => ({
        url: '/verifyemail',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    forgotPassword: builder.mutation<any, { email: string }>({
      query: (body) => ({
        url: '/password/forgot',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    resetPassword: builder.mutation<any, { password: string, token: string }>({
      query: (body) => ({
        url: '/password/reset',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const { 
  useIdentifyUserQuery,
  useLoginMutation,
  useSignupMutation,
  useResendVerificationEmailMutation,
  useVerifyEmailMutation,
  useGoogleLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = userApi;
