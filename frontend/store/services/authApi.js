import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const authApi = createApi({
  reducerPath: 'authApi',
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
    sendCode: builder.mutation({
      query: phoneNumber => ({
        url: '/auth/sendCode',
        method: 'POST',
        body: { phoneNumber },
      }),
    }),
    login: builder.mutation({
      query: ({ phoneNumber, code }) => ({
        url: '/auth/login',
        method: 'POST',
        body: { phoneNumber, code },
      }),
    }),
    otherLogin: builder.mutation({
      query: ({ email, password }) => ({
        url: '/auth/other-login',
        method: 'POST',
        body: { email, password },
      }),
    }),
    register: builder.mutation({
      query: body => ({
        url: '/auth/register',
        method: 'POST',
        body,
      }),
    }),
    getProfile: builder.query({
      query: () => '/user/profile',
    }),
  }),
});

export const {
  useSendCodeMutation,
  useLoginMutation,
  useOtherLoginMutation,
  useRegisterMutation,
  useLazyGetProfileQuery,
} = authApi;
