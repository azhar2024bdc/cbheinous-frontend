import { baseApi } from "../../api/baseApi";

// Define your API response types
interface RevenueStatResponse {
  success: boolean;
  data: {
    totalRevenue: number;
    newSupporter: number;
    newBrand: number;
    graph: Array<{
      month: string;
      sponsor: number;
      individual: number;
      quickSupport: number;
    }>;
  };
}

interface EarningStatResponse {
  success: boolean;
  data: {
    totalIndividualEarnings: number;
    totalSponsorEarnings: number;
    totalQuickEarnings: number;
  };
}

interface UserStatResponse {
  success: boolean;
  data: {
    totalUsers: number;
    totalAthletes: number;
    totalClubs: number;
    totalIndividuals: number;
    totalSponsors: number;
  };
}

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => {
        return {
          url: "login",
          method: "POST",
          body: userInfo,
        };
      },
      invalidatesTags: ["user"],
    }),
    loginWithGoogle: builder.mutation({
      query: (userInfo) => {
        console.log({ userInfo });
        return {
          url: "google-login",
          method: "POST",
          body: userInfo,
        };
      },
      invalidatesTags: ["user"],
    }),
    forgotPassword: builder.mutation({
      query: (userInfo) => {
        console.log({ userInfo });
        return {
          url: "forgot-password",
          method: "POST",
          body: userInfo,
        };
      },
      invalidatesTags: ["user"],
    }),
    resetPassword: builder.mutation({
      query: (userInfo) => {
        console.log({ userInfo });
        return {
          url: "reset-password",
          method: "POST",
          body: userInfo,
        };
      },
      invalidatesTags: ["user"],
    }),
    updateUser: builder.mutation({
      query: (userInfo) => {
        return {
          url: "user/me",
          method: "PATCH",
          body: userInfo,
        };
      },
      invalidatesTags: ["user"],
    }),
    register: builder.mutation({
      query: (userInfo) => {
        return {
          url: "register",
          method: "POST",
          body: userInfo,
        };
      },
    }),
    otp: builder.mutation({
      query: (userInfo) => {
        return {
          url: "users/verify-otp",
          method: "POST",
          body: userInfo,
        };
      },
    }),
    getMe: builder.query({
      query: () => ({
        url: "user/me",
        method: "GET",
      }),
      providesTags: ["user"],
    }),

    //  getUserStat: builder.query({
    //   query: () => ({
    //     url: "admin/dashboard/user-stat",
    //     method: "GET",
    //   }),
    //   providesTags: ["user"],
    // }),

    //  getRevenueStat: builder.query({
    //   query: (year) => ({
    //     url: `/admin/dashboard/monthly-revenue-graph/${year}`,
    //     method: "GET",
    //   }),
    //   providesTags: ["user"],
    // }),

    //  getEarningStat: builder.query({
    //   query: () => ({
    //     url: "/admin/dashboard/earning-stat",
    //     method: "GET",
    //   }),
    //   providesTags: ["user"],
    // }),

    getRevenueStat: builder.query<RevenueStatResponse, number>({
      query: (year) => ({
        url: `/admin/revenue-stats/${year}`, 
        method: "GET",
      }),
      providesTags: ["user"], 
    }),

    // Earning Statistics Query
    getEarningStat: builder.query<EarningStatResponse, undefined>({
      query: () => ({
        url: "/admin/earning-stats", 
        method: "GET",
      }),
      providesTags: ["user"],
    }),

    // User Statistics Query
    getUserStat: builder.query<UserStatResponse, undefined>({
      query: () => ({
        url: "/admin/user-stats", 
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    getAllUsers: builder.query({
      query: ({ page, limit, status }) => {
        const params = new URLSearchParams();
        if (page) params.append("page", page.toString());
        if (limit) params.append("limit", limit.toString());
        if (status) params.append("status", status);
        return {
          url: "users",
          method: "GET",
          params,
        };
      },
      providesTags: ["user"],
    }),
    blockUser: builder.mutation({
      query: (userId: string) => {
        return {
          url: `users/${userId}/block`,
          method: "PATCH",
        };      
      },
      invalidatesTags: ["user"],
    }),
    unblockUser: builder.mutation({
      query: (userId: string) => {
        return {
          url: `users/${userId}/unblock`,
          method: "PATCH",
        };
      }
    })
  //    useGetAllUsersQuery,
  // useBlockUserMutation,
  // useUnblockUserMutation,


  }),



  })


export const {
  useLoginMutation,
  useLoginWithGoogleMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useRegisterMutation,
  useUpdateUserMutation,
  useOtpMutation,
  useGetMeQuery,
  useGetUserStatQuery,
  useGetRevenueStatQuery,
  useGetEarningStatQuery,
  useGetAllUsersQuery,
  useBlockUserMutation,
  useUnblockUserMutation,
} = authApi;
