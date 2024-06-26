import { rootApi } from './rootApi';
import { socket } from '../../services/socket';

const postApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllPosts: builder.query({
      query: (page) => {
        return {
          url: `/posts/get-feed-posts?page=${page ? page : 1}`,
          method: 'GET',
        };
      },
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        try {
          await cacheDataLoaded;
          const listener = (event) => {
            updateCachedData((draft) => {
              draft.data.data.unshift(event);
            });
          };
          socket?.addEventListener('new-post', listener);
        } catch (error) {
          console.log(error);
        }
        await cacheEntryRemoved;
        socket?.removeEventListener();
      },
    }),
    getPosts: builder.query({
      query: (searchParams) => {
        return {
          url: `/posts/get-feed-posts?search=${searchParams}`,
          method: 'GET',
        };
      },
      providesTags: ['Post'],
    }),
    getYourPosts: builder.query({
      query: (isChecked) => {
        return {
          url: `/posts/get-feed-posts?isMyPostsOnly=${isChecked ? true : false}`,
          method: 'GET',
        };
      },
      providesTags: ['Post'],
    }),
    getPrivatePosts: builder.query({
      query: (isPrivate) => {
        return {
          url: `/posts/get-feed-posts?isPrivate=${isPrivate ? true : false}`,
          method: 'GET',
        };
      },
      providesTags: ['Post'],
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
  useGetPostsQuery,
  useGetYourPostsQuery,
  useGetPrivatePostsQuery,
} = postApi;
