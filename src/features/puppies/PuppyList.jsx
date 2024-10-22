import { useGetPuppiesQuery } from "./puppySlice";

/**
 * @component
 * Shows a list of puppies in the roster.
 * Users can select a puppy to see more information about it.
 */
export default function PuppyList({ setSelectedPuppyId }) {
  // TODO: Get data from getPuppies query
  const { data, isLoading, isError, error } = useGetPuppiesQuery();
  
  const puppies = data?.players || [];
  console.log("Loading:", isLoading);
  console.log("Error:", isError);
  console.log("Puppies Converted Data:", puppies);
  console.log("Puppies Raw Data:", data);

  if (isLoading) {
    return <p>Loading Puppies. Please wait...</p>;
  }

  if (isError) {
    return <p>Error Load Puppies: {error.message}</p>;
  }

  return (
    <article>
      <h2>Roster</h2>
      <ul className="puppies">
        {puppies.map((p) => (
          <li key={p.id}>
            <h3>
              {p.name} #{p.id}
            </h3>
            <figure>
              <img src={p.imageUrl} alt={p.name} />
            </figure>
            <button onClick={() => setSelectedPuppyId(p.id)}>
              See details
            </button>
          </li>
        ))}
      </ul>
    </article>
  );
}
