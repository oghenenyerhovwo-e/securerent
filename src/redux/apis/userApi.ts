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
    getUser: builder.query<{ name: string; email: string }, void>({
      query: () => '/auth/me',
      providesTags: ['User'],
    }),
    // Example mutation
    login: builder.mutation<any, { email: string; password: string }>({
      query: (body) => ({
        url: '/auth/login',
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
  }),
});

export const { 
  useGetUserQuery, 
  useLoginMutation,
  useSignupMutation,
} = userApi;
