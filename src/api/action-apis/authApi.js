import { rootApi } from './rootApi';

const authApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (user) => {
        console.log({ user });
        return {
          url: '/sign-up',
          method: 'POST',
          body: user,
        };
      },
      invalidatesTags: ['User'],
    }),

    SignIn: builder.mutation({
      query: (user) => ({
        url: '/login',
        method: 'POST',
        body: user,
      }),

      invalidatesTags: ['User'],
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation } = authApi;
