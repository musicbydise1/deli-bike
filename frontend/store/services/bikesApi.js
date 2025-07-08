import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const bikesApi = createApi({
  reducerPath: 'bikesApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: builder => ({
    getBikes: builder.query({
      query: () => '/bikes/',
    }),
    getBikeById: builder.query({
      query: id => `/bikes/${id}`,
    }),
  }),
});

export const { useGetBikesQuery, useGetBikeByIdQuery } = bikesApi;
