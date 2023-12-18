import { USERS_URL } from "../../constants";
import { apiSlice } from "../slice/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        credentials: "include",
        body: data,
      }),
    }),

    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: "POST",
        credentials: "include",
        body: data,
      }),
    }),

    forgotpassword: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/forgot-password`,
        method: "POST",
        credentials: "include",
        body: data,
      }),
    }),

    verification: builder.mutation({
      query: ({ userOTP }) => ({
        url: `${USERS_URL}/verify-otp`,
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ userOTP }),
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    update: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/:id`,
        method: "PUT",
        credentials: "include",
        body: JSON.stringify({ data }),
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    resetpassword: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/reset-password`,
        method: "PUT",
        body: data,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useForgotpasswordMutation,
  useVerificationMutation,
  useUpdateMutation,
  useResetpasswordMutation,
} = usersApiSlice;
