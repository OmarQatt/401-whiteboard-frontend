import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Post(props) {
  const [posts, setPosts] = useState([]);
  const [showPostComponent, setShowPostComponent] = useState(false);

  const allPost = process.env.HEROUKU_SERVER;
  const getAllPost = async () => {
    axios
      .get(`${allPost}getPostComment`)
      .then((response) => {
        const allPosts = response.data;
        console.log(allPosts);
        setPosts(allPosts);
        setShowPostComponent(true);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  useEffect(() => {
    getAllPost();
  }, []);

  return (
    <div>
      <Form>
        <Form.Group>
          <Form.Label>Post</Form.Label>
          <Form.Control type="text" name="postName" />
        </Form.Group>

        <Form.Group>
          <Form.Label>Comment</Form.Label>
          <Form.Control type="text" name="commentName" />
        </Form.Group>

        <Button variant="outline-dark" type="submit" value="Add Post">
          Submit
        </Button>

        <Form.Group>
          <Form.Label>Post </Form.Label>
          {showPostComponent &&
            posts.map((posts, idx) => {
              return (
                <div key={idx}>
                  <p>{posts.post}</p>
                  <Form.Group>
                    <Form.Label>Comment </Form.Label>
                  </Form.Group>
                  {showPostComponent &&
                    posts.Comments.map((comment, idx) => {
                      return (
                        <div key={idx}>
                          <p>{comment.commentWriter}</p>
                        </div>
                      );
                    })}
                </div>
              );
            })}
        </Form.Group>
      </Form>
    </div>
  );
}
