import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { getCookie } from '../../services/cookieManager';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://social-media-app-backend-rdyi.onrender.com',
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
