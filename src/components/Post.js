import React from "react";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import AddComment from './Add-Comment-Form'
import AddPost from './Add-post-form'
import EditPost from './Edit-post-modal'



export default function Post(props) {

  return (
    <div>
      <AddPost getAllPost={props.getAllPost} />
      {props.posts && props.loggedin &&
        props.posts.map((posts, idx) => {
          return (
            <div key={idx}>
              <Card style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title>{posts.userName} :Post Title:</Card.Title>
                 
                 
                      <EditPost editPost={() => props.editPost(posts.id)} postsID={posts.id} getAllPost={props.getAllPost} />
                      <Button variant="primary" onClick={() => props.deletePost(posts.id)}>Delete Post</Button>
                    
                  
                  <Card.Text>
                    {posts.post}
                  </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <AddComment PostId={posts.id} gitpost={props.getAllPost} />
                
                  {props.showPostComponent &&

                    posts.userComments.map((comment, idx) => {
                      return (

                        <div key={idx}>
                          <ListGroup.Item>{comment.userName} : {comment.comment}</ListGroup.Item>
                          <Card.Body>

                            <Button >Edit Comment</Button>
                            <Button onClick={() => props.deleteComment(comment.id)}>Delete Comment</Button>
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
