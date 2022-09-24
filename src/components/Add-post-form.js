import React from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import cookies from 'react-cookies'

function AddPostForm(props) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const Post = {
      post: e.target.post.value,
      userName:cookies.load('userName'),
      userID: cookies.load('userID')
    };
    await axios.post("http://localhost:3000/post", Post);
    props.getAllPost();
  };

  return (
    <>
    <br></br>
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group id="post">
          <Form.Label>post :</Form.Label>
          <Form.Control type="text" placeholder="Write post" id="post" as="textarea"
            rows={3}/>
        </Form.Group> 
        
        <Button variant="outline-success" type="submit">
        Add New Post
        </Button>
      </Form>
    </div>
    </>
  );
}

export default AddPostForm;