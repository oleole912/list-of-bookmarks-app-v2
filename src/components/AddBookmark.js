import { validateUrl } from "../utils/validateUrl";
import BookmarkForm from "./BookmarkForm";
import shortid from "shortid";

const AddBookmark = ({
  title,
  setTitle,
  url,
  setUrl,
  errorMessage,
  setErrorMessage,
  addBookmark,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const newMovie = {
      title: title,
      url: url,
      id: shortid(),
    };
    if (validateUrl(newMovie.url)) {
      setErrorMessage("");
      addBookmark(newMovie);
      setTitle("");
      setUrl("");
    } else {
      setErrorMessage("Invalid URL");
    }
  };
  return (
    <BookmarkForm
      title={title}
      setTitle={setTitle}
      url={url}
      setUrl={setUrl}
      errorMessage={errorMessage}
      setErrorMessage={setErrorMessage}
      onSubmit={handleSubmit}
    />
  );
};

export default AddBookmark;
