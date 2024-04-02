import { rootApi } from './rootApi';

const userApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllUsers: builder.query({
      query: () => '/users/get-all-user',
      providesTags: ['User'],
    }),

    fetchUser: builder.query({
      query: () => '/users/get-user',
      providesTags: ['User'],
    }),

    fetchUserProfile: builder.query({
      query: () => '/users/get-users-profile?userId=65cf537bf83758987bb148df',
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
  useFetchAllUsersQuery,
  useFetchUserQuery,
  useFetchUserProfileQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
