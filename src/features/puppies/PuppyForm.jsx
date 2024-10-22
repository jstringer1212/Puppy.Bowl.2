import { useState } from "react";
import { useAddPuppyMutation } from "../../api/puppyBowlApi.js";  // Import the mutation hook

/**
 * @component
 * Users can add puppies to the roster by submitting this form.
 */
export default function PuppyForm() {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [addPuppy, { isLoading, isError }] = useAddPuppyMutation(); // Destructure the mutation hook

  async function postPuppy(event) {
    event.preventDefault();

    // Placeholder image w/ random photos of dogs
    const imageUrl = "https://loremflickr.com/200/300/dog";

    try {
      // Call the addPuppy mutation with the form data
      await addPuppy({ name, breed, imageUrl });

      // Clear the form after successful submission
      setName("");
      setBreed("");
    } catch (err) {
      console.error("Failed to add puppy:", err);
    }
  }

  return (
    <>
      <h2>Add a Puppy</h2>
      <form onSubmit={postPuppy}>
        <label>
          Name
          <input
            name="puppyName"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Breed
          <input
            name="breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
          />
        </label>
        <button type="submit" disabled={isLoading}>
          Add to Roster
        </button>
        {isLoading && <output>Uploading puppy information...</output>}
        {isError && <output>{error.message}</output>}
      </form>
    </>
  );
}
