import { io } from 'socket.io-client';

import { rootApi } from './rootApi';
import { getCookie } from '../../services/cookieManager';

const postApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllPosts: builder.query({
      query: (page) => {
        return {
          url: `/posts/get-feed-posts?page=${page}`,
          method: 'GET',
        };
      },
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        const socket = io('http://localhost:5000/', {
          extraHeaders: {
            token: getCookie(),
          },
        });
        socket.onopen = () => {
          console.log('Connected to WebSocket server');
        };
        socket.onmessage = (event) => {
          const data = JSON.parse(event.data);
          updateCachedData((draft) => {
            draft.data.unshift(data);
          });
        };
        socket.onerror = (error) => {
          console.error('WebSocket error:', error);
        };

        return () => {
          socket.close();
        };
      },
    }),
    createPost: builder.mutation({
      query: (data) => {
        const formData = new FormData();
        for (const key in data) {
          formData.append(key, data[key]);
        }
        return {
          url: '/posts/create-post',
          method: 'POST',
          body: formData,
        };
      },
      // invalidatesTags: ['Post'],
    }),
    fetchPostImg: builder.query({
      query: (postId) => {
        return {
          url: `/posts/get-feed-image?postId=${postId}`,
          method: 'GET',
        };
      },
      // invalidatesTags: ['Post'],
    }),
  }),
});

export const {
  useFetchAllPostsQuery,
  useCreatePostMutation,
  useFetchPostImgQuery,
} = postApi;
