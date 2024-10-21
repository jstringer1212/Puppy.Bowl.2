import React from 'react';
import { useGetPuppyQuery, useDeletePuppyMutation } from './api'; // Import the necessary hooks from the API

/**
 * @component
 * Shows comprehensive information about the selected puppy, if there is one.
 * Also provides a button for users to remove the selected puppy from the roster.
 */
export default function PuppyDetails({ selectedPuppyId, setSelectedPuppyId }) {
  // Grab data from the `getPuppy` query
  const { data: puppy, error, isLoading } = useGetPuppyQuery(selectedPuppyId, {
    skip: !selectedPuppyId, // Only run the query if a puppy is selected
  });

  // Use the `deletePuppy` mutation
  const [deletePuppy] = useDeletePuppyMutation();

  // Function to remove puppy and reset the selected puppy ID
  async function removePuppy(id) {
    try {
      await deletePuppy(id); // Call the mutation to delete the puppy
      setSelectedPuppyId(null); // Reset selected puppy after deletion
    } catch (error) {
      console.error("Failed to delete puppy:", error);
    }
  }

  // There are 3 possibilities:
  let $details;

  // 1. A puppy has not yet been selected.
  if (!selectedPuppyId) {
    $details = <p>Please select a puppy to see more details.</p>;
  }
  // 2. A puppy has been selected, but results have not yet returned from the API.
  else if (isLoading) {
    $details = <p>Loading puppy information...</p>;
  }
  // 3. Information about the selected puppy has returned from the API.
  else if (puppy) {
    $details = (
      <>
        <h3>
          {puppy.name} #{puppy.id}
        </h3>
        <p>{puppy.breed}</p>
        <p>Team {puppy.team?.name ?? "Unassigned"}</p>
        <button onClick={() => removePuppy(puppy.id)}>Remove from roster</button>
        <figure>
          <img src={puppy.imageUrl} alt={puppy.name} />
        </figure>
      </>
    );
  }
  // 4. Error handling
  else if (error) {
    $details = <p>Error fetching puppy details: {error.message}</p>;
  }

  return (
    <aside>
      <h2>Selected Puppy</h2>
      {$details}
    </aside>
  );
}
