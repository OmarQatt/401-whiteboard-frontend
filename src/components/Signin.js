import React, { useContext } from "react"
import Post from './Post'
import { When } from 'react-if';
import cookies from 'react-cookies'
import { Link } from "react-router-dom";
import { authContext } from "./Context/AuthContext";
import logo from '../photo/OmarQattam.jpeg'
import { Button,  Flex , Avatar , Box , Heading , Text } from '@chakra-ui/react'
export default function Signin() {

  const {  logout, posts, getAllPost, showPostComponent,
     handleLogin, deleteComment, editPost, deletePost, user} = useContext(authContext)




  return (
    <>
      <When condition={!user.loggedin}>
        <div className="Auth-form-container">
          <form className="Auth-form" onSubmit={handleLogin}>
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Sign In</h3>
              <div className="text-center">
                Not registered yet?{" "}
                <span className="link-primary" >
                  <Link to="/signup">Sign Up</Link>
                </span>
              </div>
              <div className="form-group mt-3">
                <label>Email</label>
                <input
                  name='email'
                  type="email"
                  className="form-control mt-1"
                  placeholder="Email Address"
                />
              </div>
              <div className="form-group mt-3">
                <label>password</label>
                <input
                  name='password'
                  type="password"
                  className="form-control mt-1"
                  placeholder="Enter Password"
                />
              </div>
              <div className="d-grid gap-2 mt-3">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
              <p className="text-center mt-2">
                Forgot <Link to="#">password?</Link>
              </p>
            </div>
          </form>
        </div>
      </When>
      <When condition={user.loggedin}>
        
        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                      <Avatar name='Segun Adebayo' src={logo} alt="Logo"/>

                      <Box>
                        <Heading size='sm'>{posts.userName}</Heading>
                        <Text>{cookies.load('userName')}</Text>
                      </Box>
                      <Button onClick={logout}>Log Out</Button>
                    </Flex>
        <Post roles={user.roles} nameOfCreator={cookies.load('userName')} loggedin={user.loggedin} posts={posts} getAllPost={getAllPost} showPostComponent={showPostComponent} deleteComment={deleteComment} editPost={editPost} deletePost={deletePost} />
      </When>
    </>
  )
}