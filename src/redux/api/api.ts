import { getCurrentUser } from "@/utils/auth";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ILoginRequest, ILoginResponse, IUser, ITripsResponse, ITodayResponse } from "./api.type";


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
        getTrips: builder.query<ITripsResponse, void>({
            query: () => ({
                url: "/me/trips/",
                method: "GET",
            }),
            providesTags: ["User"],
        }),
        getTodaySchedule: builder.query<ITodayResponse, string | void>({
            query: (date) => ({
                url: `/app/today/?date=${date}`,
                method: "GET",
            }),
            providesTags: ["User"],
        }),
    })
})

export const {
    useLoginMutation,
    useGetProfileQuery,
    useUpdateProfileMutation,
    useGetTripsQuery,
    useGetTodayScheduleQuery,
} = baseApi;

export default baseApi;
