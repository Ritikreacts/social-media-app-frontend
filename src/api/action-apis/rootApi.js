import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { getCookie } from '../../services/cookieManager';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000/',
  prepareHeaders: (headers) => {
    const token = getCookie();
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});
export const rootApi = createApi({
  baseQuery: baseQuery,
  endpoints: () => ({}),
  tagTypes: ['User', 'Post'],
});
