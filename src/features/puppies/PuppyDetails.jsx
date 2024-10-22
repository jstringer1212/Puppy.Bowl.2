import React from 'react';
import { useGetPuppyQuery, useDeletePuppyMutation } from "../../api/puppyBowlApi.js"; // Import the necessary hooks from the API

export default function PuppyDetails({ selectedPuppyId, setSelectedPuppyId }) {
  const { data, error, isLoading } = useGetPuppyQuery(selectedPuppyId, {
    skip: !selectedPuppyId, // Skip the query if no ID is selected
  });

  // Access the player data correctly
  const player = data?.data?.player;

  if (isLoading) {
    return <p>Loading Puppies. Please wait...</p>;
  }

  if (error) {
    console.error("Error fetching puppy:", error);
    return <p>Error Loading Puppy: {error.message}</p>;
  }

  const handleBack = () => {
    setSelectedPuppyId(null);
  };

  return (
    <aside>
      {!selectedPuppyId && <p>No puppy selected.</p>}
      {player && (
        <>
          <h2>Selected Puppy</h2>
          <button onClick={handleBack}>Back to Roster</button>
          <h3>
            Name: {player.name}
            <br />
            Puppy ID: {selectedPuppyId}
          </h3>
          <p>{player.breed}</p>
          <p>Team {player.team?.name ?? "Unassigned"}</p>
          <button onClick={() => removePuppy(player.id)}>Remove from roster</button>
          <figure>
            <img src={player.imageUrl} alt={player.name} />
          </figure>
        </>
      )}
    </aside>
  );
}
