import { rootApi } from './rootApi';

const postApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllPosts: builder.query({
      query: () => {
        return {
          url: '/posts/get-feed-posts?page=1&perPage=20&search&isMyPostsOnly&isPrivate',
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
      invalidatesTags: ['Post'],
    }),
    fetchPostImg: builder.query({
      query: (postId) => {
        return {
          url: `/posts/get-feed-image?postId=${postId}`,
          method: 'GET',
        };
      },
      invalidatesTags: ['Post'],
    }),
  }),
});

export const {
  useFetchAllPostsQuery,
  useLazyFetchAllPostsQuery,
  useCreatePostMutation,
  useFetchPostImgQuery,
} = postApi;
