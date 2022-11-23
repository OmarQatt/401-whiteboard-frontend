import React from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import cookies from 'react-cookies'
import { HStack, Input, Button, Stack, InputGroup, InputLeftAddon } from '@chakra-ui/react'
function AddPostForm(props) {
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const Post = {
      post: e.target.post.value,
      userName:cookies.load('userName'),
      userID: cookies.load('userID')
    };
    try {

      await axios.post(`${process.env.REACT_APP_HOST}/post`, Post
      , {
        headers: {
            Authorization: `Barear ${localStorage.getItem('token')}`
    }}
    );
      props.getAllPost();
    }catch(e) {
      console.log(e);
    }
  };

  return (
    <>
    <br></br>
    <div>
    <Stack spacing={4}>
      <Form onSubmit={handleSubmit} style={{marginRight:"400px",padding:"10px"}}>
        <InputGroup id="post">
        <InputLeftAddon children='Post:' bg="highlight"/>
          <Input type="text" placeholder="Write post" size='lg' id="post" as="textarea"
            rows={3}/>
        </InputGroup> 
       
        <Button bg="highlight" size='lg'  type="submit">Add New Post</Button>
      </Form>
      </Stack>
      <HStack >
  
</HStack>

    </div>
    </>
  );
}

export default AddPostForm;