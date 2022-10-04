import React, { useEffect, useContext } from "react"
import Post from './Post'
import { When } from 'react-if';
import cookies from 'react-cookies'
import { Link } from "react-router-dom";
import { authContext } from "./Context/AuthContext";

export default function () {

  const { loggedin, logout, setLoggedin, posts, getAllPost, showPostComponent, handleLogin, roles, setRoles, deleteComment, editPost, deletePost } = useContext(authContext)

  useEffect(() => {
    setRoles(cookies.load('role'))
    const token = cookies.load('token')
    if (token) {
      getAllPost();
      setLoggedin(true)
    }
    console.log(token + ' token')
  }, [])


  return (
    <>
      <When condition={!loggedin}>
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
                <label>User Name</label>
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
                Forgot <a href="#">password?</a>
              </p>
            </div>
          </form>
        </div>
      </When>
      <When condition={loggedin}>
        <button onClick={logout}>Log Out</button>
        <p>{cookies.load('userName')}</p>
        <Post roles={roles} nameOfCreator={cookies.load('userName')} loggedin={loggedin} posts={posts} getAllPost={getAllPost} showPostComponent={showPostComponent} deleteComment={deleteComment} editPost={editPost} deletePost={deletePost} />
      </When>
    </>
  )
}