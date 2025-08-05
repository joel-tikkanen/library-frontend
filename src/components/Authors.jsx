import { useQuery } from "@apollo/client";
import { ALL_AUTHORS } from "../queries";
import SetBirthYear from "./SetBirthYear";

const Authors = ({ show }) => {
  if (!show) {
    return null;
  }

  const result = useQuery(ALL_AUTHORS);

  if (result.loading) {
    return <div>Loading...</div>;
  }

  if (result.error) {
    return <div>Error: {result.error.message}</div>;
  }

  const authors = result.data.allAuthors;

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Born</th>
            <th>Books</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((author) => (
            <tr key={author.name}>
              <td>{author.name}</td>
              <td>{author.born || "N/A"}</td>
              <td>{author.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <SetBirthYear />
    </div>
  );
};

export default Authors;