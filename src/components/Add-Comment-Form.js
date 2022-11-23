import React from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import cookies from 'react-cookies'
import { Button, Stack } from '@chakra-ui/react'

function AddCommentForm(props) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const Comment = {
      userName:cookies.load('userName'),
      comment: e.target.commentWriter.value,
      postID: props.PostId,
      userID: cookies.load('userID')
    };
    await axios.post(`${process.env.REACT_APP_HOST}/comment`, Comment, {
      headers: {
          Authorization: `Barear ${cookies.load('token')}`
  }});
    props.gitpost();
  };

  return (
    <>
    <br></br>
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group id="commentWriter">
         
          <Form.Control type="text" placeholder="Write a comment" id="commentWriter" as="textarea"
            rows={3}/>
        </Form.Group>
        <Stack>
        <Button bg="highlight" type="submit">
        Add New Comment
        </Button>
        </Stack>
      </Form>
    </div>
    </>
  );
}

export default AddCommentForm;