import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_BOOK, ALL_BOOKS, ALL_AUTHORS } from "../queries";

const NewBook = ({ show }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
    onError: (error) => {
      console.log("Error adding book:", error.message);
    },
  });

  if (!show) {
    return null;
  }

  const submit = (event) => {
    event.preventDefault();

    addBook({
      variables: {
        title,
        author,
        published: Number(published),
        genres,
      },
    });

    setTitle("");
    setAuthor("");
    setPublished("");
    setGenre("");
    setGenres([]);
  };

  const addGenre = () => {
    setGenres([...genres, genre]);
    setGenre("");
  };

  return (
    <div>
      <h2>Add a New Book</h2>
      <form onSubmit={submit}>
        <div>
          Title:
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          Author:
          <input value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          Published:
          <input
            type="number"
            value={published}
            onChange={(e) => setPublished(e.target.value)}
          />
        </div>
        <div>
          Genre:
          <input value={genre} onChange={(e) => setGenre(e.target.value)} />
          <button type="button" onClick={addGenre}>
            Add Genre
          </button>
        </div>
        <div>Genres: {genres.join(", ")}</div>
        <button type="submit">Create Book</button>
      </form>
    </div>
  );
};

export default NewBook;