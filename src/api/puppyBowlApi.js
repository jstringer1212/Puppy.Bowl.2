import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COHORT_CODE = "2407-FTB-ET-WEB-PT";
const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${COHORT_CODE}/`;

// Configure createApi to use API_URL as the base URL
// Add "Puppy" as a tag type
const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ["Puppy"],
  endpoints: (builder) => ({
    // Fetch all puppies
    getAllPuppies: builder.query({
      query: () => 'puppies',
      providesTags: ['Puppy'], 
    }),

    // Add a new puppy
    addPuppy: builder.mutation({
      query: (newPuppy) => ({
        url: 'puppies',
        method: 'POST',
        body: newPuppy,
      }),
      invalidatesTags: ['Puppy'], 
    }),

    // Delete a puppy
    deletePuppy: builder.mutation({
      query: (id) => ({
        url: `puppies/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Puppy'], 
    }),
  }),
});

export const {
  useGetAllPuppiesQuery,
  useAddPuppyMutation,
  useDeletePuppyMutation, 
} = api;

export default api;
