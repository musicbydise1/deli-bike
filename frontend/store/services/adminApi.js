import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: headers => {
      if (typeof localStorage !== 'undefined') {
        const token = localStorage.getItem('accessToken');
        if (token) headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    getAnalytics: builder.query({
      query: () => '/admin/analytics',
    }),
    getCouriers: builder.query({
      query: () => '/couriers',
    }),
  }),
});

export const { useGetAnalyticsQuery, useGetCouriersQuery } = adminApi;
