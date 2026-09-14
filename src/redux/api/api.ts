import { getCurrentUser } from "@/utils/auth";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ILoginRequest, ILoginResponse, IUser } from "./api.type";


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
    tagTypes: ["User"],
    endpoints: (builder) => ({
        login: builder.mutation<ILoginResponse, ILoginRequest>({
            query: (data) => {
                return {
                    url: "/auth/login/",
                    method: "POST",
                    body: data
                }
            }
        }),
        getProfile: builder.query<IUser, void>({
            query: () => ({
                url: "/auth/me/",
                method: "GET",
            }),
            providesTags: ["User"],
        }),
        updateProfile: builder.mutation<IUser, FormData | Partial<IUser>>({
            query: (data) => ({
                url: "/auth/me/",
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["User"],
        }),
    })
})

export const { useLoginMutation, useGetProfileQuery, useUpdateProfileMutation } = baseApi;

export default baseApi;