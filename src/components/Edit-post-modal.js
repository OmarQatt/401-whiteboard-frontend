import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import axios from "axios";
import cookies from 'react-cookies'
import { Button, Stack} from '@chakra-ui/react'
function EditModal(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const Post = {
      post: e.target.post.value,
      
    };
    await axios.put(`${process.env.REACT_APP_HOST}/post/${props.postsID}`, Post, {
      headers: {
          Authorization: `Barear ${cookies.load('token')}`
  }});
    props.getAllPost();
  };
  return (
    <>
      <Stack spacing={4}>
      <Button bg="highlight" onClick={handleShow}>
        Edit Post
      </Button>
      </Stack>
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
        <Button  type="submit" bg="highlight">
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