import { rootApi } from './rootApi';

const userApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchUser: builder.query({
      query: () => '/users/get-user',
      providesTags: ['User'],
    }),

    updateUser: builder.mutation({
      query: (user) => ({
        url: '/users/update-user',
        method: 'PUT',
        body: user,
      }),
      invalidatesTags: ['User'],
    }),

    deleteUser: builder.mutation({
      query: () => ({
        url: '/users/delete-user',
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useFetchUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
