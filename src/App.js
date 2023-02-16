import AddBookmarkForm from "./components/AddBookmark";
import BookmarksList from "./components/BookmarksList";
import { useState } from "react";
import { data } from "./data/data.js";
import { Container } from "react-bootstrap";

function App() {
  const [title, setTitle] = useState();
  const [url, setUrl] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [bookmarks, setBookmarks] = useState(data.bookmarks);

  const addBookmark = (newBookmark) => {
    setBookmarks((prevBookmarks) => {
      return [newBookmark, ...prevBookmarks];
    });
  };

  const deleteBookmark = (id) => {
    setBookmarks((prevBookmarks) => {
      return prevBookmarks.filter((bookmark) => bookmark.id !== id);
    });
  };

  const deleteAllBookmarks = () => {
    setBookmarks([]);
  };

  return (
    <Container>
      <h1 className="my-5 text-center text-secondary">
        My Bookmarks - Movies to see
      </h1>
      <h3 className="text-center text-dark">Add New Position</h3>
      <AddBookmarkForm
        title={title}
        setTitle={setTitle}
        url={url}
        setUrl={setUrl}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        addBookmark={addBookmark}
      />
      <BookmarksList
        data={bookmarks}
        title={title}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        addBookmark={addBookmark}
        deleteBookmark={deleteBookmark}
        deleteAllBookmarks={deleteAllBookmarks}
      />
    </Container>
  );
}

export default App;
