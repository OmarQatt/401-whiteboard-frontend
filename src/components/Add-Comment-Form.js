import React from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import cookies from 'react-cookies'

function AddCommentForm(props) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const Comment = {
      userName:cookies.load('userName'),
      comment: e.target.commentWriter.value,
      postID: props.PostId,
      userID: cookies.load('userID')
    };
    await axios.post("http://localhost:3000/comment", Comment);
    props.gitpost();
  };

  return (
    <>
    <br></br>
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group id="commentWriter">
          <Form.Label>commentWriter :</Form.Label>
          <Form.Control type="text" placeholder="Write commentWriter" id="commentWriter" as="textarea"
            rows={3}/>
        </Form.Group>

        <Button variant="outline-success" type="submit">
        Add New Comment
        </Button>
      </Form>
    </div>
    </>
  );
}

export default AddCommentForm;