import { getCurrentUser } from "@/utils/auth";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    prepareHeaders: async (headers) => {
        const { access } = await getCurrentUser();
        if (access) {
            headers.set('Authorization', `Bearer ${access}`);
        }
        return headers;
    }
})



const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: baseQuery,
    tagTypes: [],
    endpoints: (builder) => ({
        bookTalkWithUs: builder.mutation({
            query: (data) => {
                return {
                    url: "/anonymous/book/",
                    method: "POST",
                    body: data
                }
            }
        }),
    })
})

export default baseApi;