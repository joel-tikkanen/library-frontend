import { useQuery } from "@apollo/client";
import { ALL_BOOKS, ME } from "../queries";

const Recommended = ({ show }) => {
    const meResult = useQuery(ME, {
        skip: !show,
    });
    const favoriteGenre = meResult.data?.me?.favoriteGenre;
    const booksResult = useQuery(ALL_BOOKS, {
        variables: { genre: favoriteGenre },
        skip: !favoriteGenre || !show,
    });

    if (!show) {
        return null;
    }

    if (meResult.loading || booksResult.loading) {
        return <div>Loading...</div>;
    }

    if (meResult.error || booksResult.error) {
        return <div>error.</div>;
    }

    const books = booksResult.data?.allBooks;

    if (!books || books.length === 0) {
        return (
            <div>
                <h2>recommendations</h2>
                <p>no books for u. genre: {favoriteGenre}</p>
            </div>


        )
    }

    return (
        <div>
            <h2>recommendations</h2>
            <p>
                books in your favorite genre: <strong>{favoriteGenre}</strong>
            </p>
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
        </div>
    );
};

export default Recommended;