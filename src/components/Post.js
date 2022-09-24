import React from "react";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from "react";
import axios from "axios";
import AddComment from './Add-Comment-Form'
import AddPost from './Add-post-form'
import EditPost from './Edit-post-modal'
export default function Post(props) {
  const [posts, setPosts] = useState([]);
  const [showPostComponent, setShowPostComponent] = useState(false);

  const allPost = `https://whiteboard-401.herokuapp.com/`;
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

  const deletePost = async (id) => {
    await axios.delete(`https://whiteboard-401.herokuapp.com/post/${id}`);
    getAllPost();
  };
  const deleteComment = async (id) => {
    await axios.delete(`https://whiteboard-401.herokuapp.com/comment/${id}`);
    getAllPost();
  };
  const editPost = async (id, obj) => {
    await axios.put(`https://whiteboard-401.herokuapp.com/post/${id}`);
    getAllPost();
  }


  useEffect(() => {

    getAllPost();
  }, []);

  return (
    <div>
      <AddPost getAllPost={getAllPost} />

      {showPostComponent &&
        posts?.map((posts, idx) => {
          return (
            <div key={idx}>
              <Card style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title>{posts.userName} :Post Title:</Card.Title>
                  <EditPost editPost={() => editPost(posts.id)} postsID={posts.id} getAllPost={getAllPost}/>
                  <Button variant="primary" onClick={() => deletePost(posts.id)}>Delete Post</Button>
                  <Card.Text>
                    {posts.post}
                  </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <AddComment PostId={posts.userID} gitpost={getAllPost} />
                  {console.log(posts)}
                  {showPostComponent &&
                 
                    posts.userComments?.map((comment, idx) => {
                      return (

                        <div key={idx}>
                          <ListGroup.Item>{comment.userName} : {comment.comment}</ListGroup.Item>
                          <Card.Body>

                            <Button >Edit Comment</Button>
                            <Button onClick={() => deleteComment(comment.id)}>Delete Comment</Button>
                          </Card.Body>
                        </div>
                      );
                    })}


                </ListGroup>

              </Card>

            </div>
          );
        })}

    </div>
  );
}
