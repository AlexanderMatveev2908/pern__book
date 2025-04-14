import apiSlice from "@/store/apiSlice";

export type RegisterParamsAPI = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export const authAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    refreshToken: builder.mutation({
      query: (someContent) => ({
        url: "/auth/login",
        method: "POST",
        data: someContent,
      }),
    }),
    registerUser: builder.mutation({
      query: (newUser: RegisterParamsAPI) => ({
        url: "/auth/register",
        method: "POST",
        // RENAME "BODY" OF RTK QUERY TO "DATA" FOR AXIOS BASE_QUERY
        data: newUser,
      }),
    }),
  }),
});

export const { useRegisterUserMutation } = authAPI;
