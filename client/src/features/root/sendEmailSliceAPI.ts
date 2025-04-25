import apiSlice from "@/store/apiSlice";
import { SendMailEnd } from "@/types/types";

export interface ParamsSendEmail {
  email: string;
  endpoint: SendMailEnd;
}

export const sendEmailSliceAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendEmail: builder.mutation({
      query: (data: ParamsSendEmail) => ({
        url: `/send-email/${data.endpoint}`,
        data: {
          email: data.email,
        },
        method: "POST",
      }),
    }),
  }),
});

export const { useSendEmailMutation } = sendEmailSliceAPI;
