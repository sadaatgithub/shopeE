import { apiSlice } from "../services/apiSlice";

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => {

        return {
          url: "auth/login",
          method: "POST",
          body: {
            username: data.username,
            password: data.password,
          },
        };
      },
    }),
  }),
});

export const { useLoginMutation } = authApiSlice;
