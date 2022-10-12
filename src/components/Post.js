import React,{useContext, useEffect} from "react";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import AddComment from './Add-Comment-Form'
import AddPost from './Add-post-form'
import EditPost from './Edit-post-modal'
import { authContext } from "./Context/AuthContext";

export default function Post() {
  const { getAllPost, showPostComponent,posts,deletePost,deleteComment,editPost,checkToken, user} = useContext(authContext)
  useEffect(() => {
    
    getAllPost()

    checkToken()
   
   
  }, [])
  return (
    <div>
      <AddPost getAllPost={getAllPost} />
      {posts && user.loggedin &&
        posts.map((posts, idx) => {
          return (
            <div key={idx}>
              <Card style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title>{posts.userName} :Post Title:</Card.Title>
                  <EditPost editPost={() => editPost(posts.id)} postsID={posts.id} getAllPost={getAllPost} />
                  {
                    user.roles === 'admin'&&
                  <Button variant="primary" onClick={() => deletePost(posts.id)}>Delete Post</Button>
                  }
                  <Card.Text>
                    {posts.post}
                  </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <AddComment PostId={posts.id} gitpost={getAllPost} />
                  {showPostComponent &&
                    posts.userComments.map((comment, idx) => {
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
