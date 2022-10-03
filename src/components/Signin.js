
import React, { useEffect, useState } from "react"
import Post from './Post'
import axios from "axios";
import base64 from 'base-64'
import { When} from 'react-if';
import cookies from 'react-cookies'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
export default function (props) {
 const [loggedin, setLoggedin] = useState(false);
 const [posts, setPosts] = useState([]);
  const [showPostComponent, setShowPostComponent] = useState(false);
  const [roles,setRoles] = useState('');


  const allPost = `https://whiteboard-401.herokuapp.com/`;
  const getAllPost = async () => {
    try {

      axios
        .get(`${allPost}getPostComment`,{
          headers: {
              Authorization: `Bearer ${cookies.load('token')}`
      }})
        .then((response) => {
          const allPosts = response.data;
         
          setPosts(allPosts);
          setShowPostComponent(true);
        }
        ).catch((error) => console.error(`Error: ${error}`));

      }catch(e){console.log(e)}
      
  };

const handleLogin = async (e) => {
    e.preventDefault();
    const data = {
       
        username: e.target.email.value,
        password: e.target.password.value
    }

    const encodedCredintial = base64.encode(`${data.username}:${data.password}`)
    console.log(`Basic ${encodedCredintial}`)
    await axios.post(`https://whiteboard-401.herokuapp.com/login`, {}, {
        headers: {
            Authorization: `Basic ${encodedCredintial}`
    }}).then(res => {

        console.log(res.data)
        cookies.save('token', res.data.token);
        cookies.save('userID', res.data.id)
        cookies.save('userName', res.data.userName)
        cookies.save('role', res.data.role)
        setLoggedin(true)
    })
       .catch(err => console.log(err))
}

const deletePost = async (id) => {
  await axios.delete(`https://whiteboard-401.herokuapp.com/post/${id}`,{
    headers: {
      Authorization: `Bearer ${cookies.load("token")}`,
}});
  getAllPost();
};
const deleteComment = async (id) => {
  await axios.delete(`https://whiteboard-401.herokuapp.com/comment/${id}`,{
    headers: {
      Authorization: `Bearer ${cookies.load("token")}`,
}});
  getAllPost();
};
const editPost = async (id, obj) => {
  await axios.put(`https://whiteboard-401.herokuapp.com/post/${id}`,{
    headers: {
      Authorization: `Bearer ${cookies.load("token")}`,
}});
  getAllPost();
}

useEffect(() => {
 setRoles(cookies.load('role'))
  const token = cookies.load('token')
  if(token) {
    getAllPost();
    setLoggedin(true)
  }
  console.log(token+' token')
}, [])
  
const logout = () => {
  cookies.remove('token')
  cookies.remove('userID')
  cookies.remove('userName')
  cookies.remove('role')
  setLoggedin(false)
}
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
              name= 'email'
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
            />
          </div>
          <div className="form-group mt-3">
            <label>password</label>
            <input
            name= 'password'
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
    <Post roles={roles}nameOfCreator={cookies.load('userName')} loggedin={loggedin} posts={posts} getAllPost={getAllPost} showPostComponent={showPostComponent} deleteComment={deleteComment}editPost={editPost} deletePost={deletePost}/>
    </When>
    </>
  )
}