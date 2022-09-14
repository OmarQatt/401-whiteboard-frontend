import React from 'react'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {useState, useEffect} from "react";
import axios from 'axios';


export default function Post(props) {
  const [posts, setPosts] = useState([]);
  // const [showPostComponent, setshowPostComponent] = useState(false);

  const getAllPost = async () => {
    const allPost = await axios.get('http://localhost:3000/post');
    setPosts(allPost.data);
    // setshowPostComponent(true)
  }

  useEffect(() => {
    getAllPost()
  }, [])

  return (
    <div>
       <Form >
      <Form.Group>
        <Form.Label>Post</Form.Label>
        <Form.Control type="text" name='postName' />
      </Form.Group>

      <Form.Group>
        <Form.Label>Comment</Form.Label>
        <Form.Control type="text" name='commentName' />
      </Form.Group>

      <Button variant="outline-dark" type="submit" value='Add Post'>
        Submit
      </Button>
      
      <Form.Group>
      <Form.Label >Post </Form.Label>
      </Form.Group>
      <Form.Group>
      <Form.Label >Comment </Form.Label>
      </Form.Group>
    </Form>

  
      { posts &&
        posts.map((pos, idx) => {
            return (
                 <div key={idx}>
                    <p>{pos.post}</p>
                    <p>{pos.postStatus}</p>
                 </div>
            )
        })
      }
    </div>
  )
}

 
