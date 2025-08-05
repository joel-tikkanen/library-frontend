import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

const Books = ({ show }) => {
  if (!show) {
    return null;
  }

  const result = useQuery(ALL_BOOKS);

  if (result.loading) {
    return <div>Loading...</div>;
  }

  if (result.error) {
    return <div>Error: {result.error.message}</div>;
  }

  const books = result.data.allBooks;

  return (
    <div>
      <h2>Books</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;