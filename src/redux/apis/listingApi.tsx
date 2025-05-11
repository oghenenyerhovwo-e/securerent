import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const listingApi = createApi({
  reducerPath: "listingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/listings`,
  }),
  tagTypes: ['Listing'],
  endpoints: (builder) => ({
    // Create listing
    createListing: builder.mutation<any, Partial<any>>({
      query: (body) => ({
        url: '/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Listing'],
    }),

    // Read all listings
    getAllListings: builder.query<any[], void>({
      query: () => '/',
      providesTags: ['Listing'],
    }),

    getListingById: builder.query<any, string>({
        query: (id) => `/${id}`,
        providesTags: (result, error, id) => 
            (result && !error) ? [{ type: 'Listing', id }] : [], // Only provide tag if fetch succeeded
      }),
      
      updateListing: builder.mutation<any, { id: string; data: any }>({
        query: ({ id, data }) => ({
          url: `/${id}`,
          method: 'PUT',
          body: data,
        }),
        invalidatesTags: (result, error, { id }) =>
          (result && !error) ? [{ type: 'Listing', id }] : [], // Only invalidate if update was successful
      }),
      
      deleteListing: builder.mutation<any, string>({
        query: (id) => ({
          url: `/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: (result, error, id) => 
          (result && !error) ? [{ type: 'Listing', id }] : [], // Invalidate only if deletion succeeded
      }),
  }),
});

export const {
  useCreateListingMutation,
  useGetAllListingsQuery,
  useGetListingByIdQuery,
  useUpdateListingMutation,
  useDeleteListingMutation,
} = listingApi;
