import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const rentalsApi = createApi({
  reducerPath: 'rentalsApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: builder => ({
    getRentals: builder.query({
      query: () => '/rentals/',
    }),
    getRentalsByUser: builder.query({
      query: userId => `/rentals/user/${userId}`,
    }),
    getRentalHistoryByUser: builder.query({
      query: userId => `/rentals/user/${userId}/history`,
    }),
    getRentalById: builder.query({
      query: id => `/rentals/${id}`,
    }),
    updateRentalStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/rentals/${id}/status`,
        method: 'PATCH',
        body: { status },
      }),
    }),
  }),
});

export const {
  useGetRentalsQuery,
  useGetRentalsByUserQuery,
  useGetRentalHistoryByUserQuery,
  useGetRentalByIdQuery,
  useUpdateRentalStatusMutation,
} = rentalsApi;
