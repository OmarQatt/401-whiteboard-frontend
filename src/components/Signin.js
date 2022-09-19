
import React, { useState } from "react"
import Post from './Post'
import axios from "axios";
import base64 from 'base-64'
import { When} from 'react-if';
export default function (props) {
 const [loggedin, setLoggedin] = useState(false);
const handleLogin = async (e) => {
    e.preventDefault();
    const data = {
       
        username: e.target.email.value,
        password: e.target.password.value
    }

    const encodedCredintial = base64.encode(`${data.username}:${data.password}`)
    // console.log(`Basic ${encodedCredintial}`)
    await axios.post('https://whiteboard-401.herokuapp.com/login', {}, {
        headers: {
            Authorization: `Basic ${encodedCredintial}`
    }}).then(res => {

        console.log(res.data)
        setLoggedin(true)
    })
       .catch(err => console.log(err))
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
              Sign Up
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
    <Post/>
    </When>
    </>
  )
}