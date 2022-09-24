import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import axios from "axios";
function EditModal(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const Post = {
      post: e.target.post.value,
      
    };
    await axios.put(`http://localhost:3000/post/${props.postsID}`, Post);
    props.getAllPost();
  };
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Edit Post
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={handleSubmit}>
        <Form.Group id="post">
          <Form.Label>post :</Form.Label>
          <Form.Control type="text" placeholder="Write post" id="post" as="textarea"
            rows={3}/>
        </Form.Group> 
        <Button variant="outline-success" type="submit">
        Edit Post
        </Button>
      </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={props.editPost}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditModal;