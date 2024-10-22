import api from "../../api/puppyBowlApi";

/*
TODO: Define the following 4 endpoints:
  1. getPuppies (query)
  2. getPuppy (query)
  3. addPuppy (mutation)
  4. deletePuppy (mutation)

The query endpoints should provide the "Puppy" tag.
The mutation endpoints should invalidate the "Puppy" tag.

(Optional) TODO: Write `transformResponse` and `transformErrorResponse`
functions for each endpoint.
*/

const puppyApi = api.injectEndpoints({
  endpoints: (build) => ({
    getPuppies: build.query({
      query: () => "/players",
      providesTags: ["Puppy"],
      transformResponse: (response) => response.data,
      transformErrorResponse: (error) => error,
    }),

    getPuppy: build.query({
      query: (SelectedPuppyId) => `/players/${SelectedPuppyId}`,
      providesTags: ["Puppy"],
      transformResponse: (response) => response.data,
      transformErrorResponse: (error) => error,
    }),

    addPuppy: build.mutation({
      query: (newPuppy) => ({
        url: "/players",
        method: "POST",
        body: newPuppy,
      }),
      invalidatesTags: ["Puppy"],
      transformResponse: (response) => response.data,
      transformErrorResponse: (error) => error,
    }),

    deletePuppy: build.mutation({
      query: (SelectedPuppyId) => ({
        url: "players",
        method: "DELETE",
      }),
      invalidatesTags: ["Puppy"],
      transformResponse: (response) => response.data,
      transformErrorResponse: (error) => error,
    })
  }),
});

export const {
  useGetPuppiesQuery,
  useGetPuppyQuery,
  useAddPuppyMutation,
  useDeletePuppyMutation,
} = puppyApi;
