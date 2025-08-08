import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
import { useState } from "react";

const Books = ({ show }) => {
  const [genre, setGenre] = useState(null);
  const { loading, error, data } = useQuery(ALL_BOOKS, {
    variables: { genre },
  });
  const { data: allBooksData } = useQuery(ALL_BOOKS);

  if (!show) {
    return null;
  }

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>error: {error.message}</div>;
  }

  const books = data.allBooks;
  const allGenres = allBooksData
    ? [...new Set(allBooksData.allBooks.flatMap((book) => book.genres))]
    : [];

  return (
    <div>
      <h2>books</h2>
      <table>
        <thead>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {allGenres.map((g) => (
          <button key={g} onClick={() => setGenre(g)}>
            {g}
          </button>
        ))}
        <button onClick={() => setGenre(null)}>all genres</button>
      </div>
    </div>
  );
};

export default Books;