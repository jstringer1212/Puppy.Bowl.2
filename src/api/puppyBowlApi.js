import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COHORT_CODE = "2407-FTB-ET-WEB-PT";
const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/2407-FTB-ET-WEB-PT/`;

// Configure createApi to use API_URL as the base URL
// Add "Puppy" as a tag type
const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ["Puppy"],
  endpoints: (builder) => ({
    // Fetch all puppies
    getAllPuppies: builder.query({
      query: () => 'players',
      providesTags: ['Puppy'], 
    }),

    // Fetch a specific puppy by ID
    getPuppy: builder.query({
      query: (id) => `players/${id}`, 
      providesTags: ['Puppy'], 
    }),

    // Add a new puppy
    addPuppy: builder.mutation({
      query: (newPuppy) => ({
        url: 'players',
        method: 'POST',
        body: newPuppy,
      }),
      invalidatesTags: ['Puppy'], 
    }),

    // Delete a puppy
    deletePuppy: builder.mutation({
      query: (id) => ({
        url: `players/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Puppy'], 
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetAllPuppiesQuery,
  useAddPuppyMutation,
  useDeletePuppyMutation,
  useGetPuppyQuery,
} = api;

export default api;
