import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";

const SetBirthYear = () => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const result = useQuery(ALL_AUTHORS);
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.log("Error setting birth year:", error.message);
    },
  });



  if (result.loading) {
    return <div>Loading...</div>;
  }

  if (result.error) {
    return <div>Error: {result.error.message}</div>;
  }

  const authors = result.data.allAuthors;

  const submit = (event) => {
    event.preventDefault();

    if (name) {
      editAuthor({
        variables: {
          name,
          setBornTo: Number(born),
        },
      });

      setName("");
      setBorn("");
    }
  };

  return (
    <div>
      <h2>Set Birth Year</h2>
      <form onSubmit={submit}>
        <div>
          Author:
          <select value={name} onChange={(e) => setName(e.target.value)}>
            <option value="">Select an author</option>
            {authors.map((author) => (
              <option key={author.name} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          Born:
          <input
            type="number"
            value={born}
            onChange={(e) => setBorn(e.target.value)}
          />
        </div>
        <button type="submit">Set Birth Year</button>
      </form>
    </div>
  );
};

export default SetBirthYear;