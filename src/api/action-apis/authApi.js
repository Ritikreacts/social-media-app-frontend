import { rootApi } from './rootApi';

const authApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (user) => {
        return {
          url: '/sign-up',
          method: 'POST',
          body: user,
        };
      },
    }),

    signIn: builder.mutation({
      query: (user) => ({
        url: '/login',
        method: 'POST',
        body: user,
      }),
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation } = authApi;
