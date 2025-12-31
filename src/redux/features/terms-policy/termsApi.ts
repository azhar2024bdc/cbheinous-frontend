
import { baseApi } from "../../api/baseApi";

const termsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTerms: builder.query({
      query: () => ({
        url: `/terms&condition/all`,
        method: "GET",
      }),
      providesTags: ["terms"],
    }),

    getSingleTerms: builder.query({
      query: (id) => ({
        url: `/terms&condition/single/${id}`,
        method: "GET",
      }),
      providesTags: ["terms"],
    }),



    createNewTerms: builder.mutation({
      query: (data) => {
        return {
          url: "/terms&condition/create",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["terms"],
    }),



    updateTerms: builder.mutation({
      query: ({data,id}) => {
        return {
          url: `/terms&condition/update/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["terms"],
    }),

    deleteTerms: builder.mutation({
      query: (id) => {
        return {
          url: `/terms&condition/delete/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["terms"],
    }),

    // helps and support
  getAllHelpsAndSupport: builder.query({
      query: ({ page, limit,nameSort,dateSort }) => ({
      url: `/help&support?page=${page}&limit=${limit}&nameSort=${nameSort}&dateSort=${dateSort}`,
      method: "GET",
    }),
  providesTags: ["terms"],
}),


    addHelpsAndSupport: builder.mutation({
      query: (data) => {
        return {
          url: "/help&support/create",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["terms"],
    }),
    
  }),
});

export const {
  useGetAllTermsQuery,
  useGetSingleTermsQuery,
  useUpdateTermsMutation,
  useCreateNewTermsMutation,
  useDeleteTermsMutation,
  useGetAllHelpsAndSupportQuery,
  useAddHelpsAndSupportMutation
} = termsApi;
