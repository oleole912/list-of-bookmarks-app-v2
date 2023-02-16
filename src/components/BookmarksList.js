import { Button, ListGroup, Modal } from "react-bootstrap";
import BookmarkForm from "./BookmarkForm";
import Pagination from "./Pagination";
import { useState } from "react";
import shortid from "shortid";
import { validateUrl } from "../utils/validateUrl";

const BookmarksList = ({
  data,
  errorMessage,
  setErrorMessage,
  addBookmark,
  deleteBookmark,
  deleteAllBookmarks,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [bookmarksPerPage] = useState(20);
  const [show, setShow] = useState(false);
  const [editTitle, setEditTitle] = useState();
  const [editUrl, setEditUrl] = useState();
  const [id, setId] = useState();

  const indexOfLastBookmark = currentPage * bookmarksPerPage;
  const indexOfFirstBookmark = indexOfLastBookmark - bookmarksPerPage;
  // get bookmarks displayed on current page
  const visibleBookmarks = data.slice(
    indexOfFirstBookmark,
    indexOfLastBookmark
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // close modal with edit form on button click
  const handleClose = () => setShow(false);

  // show modal with edit form on button click
  const handleShow = ({ link }) => {
    setShow(true);
    console.log(link.title);
    setEditTitle(link.title);
    setEditUrl(link.url);
    setId(link.id);
  };

  const submitEdit = (e) => {
    const editedMovie = {
      title: editTitle,
      url: editUrl,
      id: shortid(),
    };
    if (validateUrl(editedMovie.url)) {
      setErrorMessage("");
      addBookmark(editedMovie);
      deleteBookmark(e.target.value);
      setShow(false);
    } else {
      setErrorMessage("Invalid URL");
    }
  };

  const handleDelete = ({ link }) => {
    deleteBookmark(link.id);
  };

  const deleteAll = () => {
    deleteAllBookmarks();
  };

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h3 className="text-dark">Movies I want to see:</h3>
        <Button
          variant="outline-danger"
          size="sm"
          className="m-1"
          onClick={deleteAll}
        >
          Clear all
        </Button>
      </div>
      <ListGroup>
        {data.length === 0 ? (<p>No bookmarks on the list.</p>) : (
        visibleBookmarks.map((link) => (
          <div key={link.id}>
            {" "}
            <ListGroup.Item
              key={link.id}
              className="d-flex justify-content-between"
            >
              <a href={link.url}>{link.title}</a>
              <div>
                <i
                  className="fa fa-solid fa-pencil text-warning mx-3"
                  onClick={() => handleShow({ link })}
                ></i>
                <i
                  className="fa fa-solid fa-trash text-danger mx-3"
                  onClick={() => handleDelete({ link })}
                ></i>
              </div>
            </ListGroup.Item>
            <Modal show={show} onHide={handleClose}>
              <Modal.Body>
                <h3 className="text-center text-dark">Edit Position</h3>
                <BookmarkForm
                  title={editTitle}
                  url={editUrl}
                  setTitle={setEditTitle}
                  setUrl={setEditUrl}
                  errorMessage={errorMessage}
                  setErrorMessage={setErrorMessage}
                  className={"d-none"}
                />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button
                  variant="primary"
                  onClick={(e) => submitEdit(e)}
                  value={id}
                >
                  Save Changes{" "}
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        )))}
      </ListGroup>

      <Pagination
        paginate={paginate}
        bookmarksPerPage={bookmarksPerPage}
        totalBookmarks={data.length}
      />
    </div>
  );
};

export default BookmarksList;
