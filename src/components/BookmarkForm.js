import { Form, Button } from "react-bootstrap";

const BookmarkForm = ({
  title,
  setTitle,
  url,
  setUrl,
  errorMessage,
  onSubmit,
  className,
}) => {
  return (
    <Form className="w-50 mx-auto my-4" onSubmit={onSubmit}>
      <Form.Group className="mb-3" controlId="text">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="text">
        <Form.Label>URL</Form.Label>
        <Form.Control
          type="text"
          placeholder="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <p className="text-danger">{errorMessage}</p>
      </Form.Group>
      <div className="text-center">
        <Button variant="info" type="submit" className={className}>
          Submit
        </Button>
      </div>
    </Form>
  );
};

export default BookmarkForm;
