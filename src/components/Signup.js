import React from "react"
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import cookies from 'react-cookies'
export default function () {
const handleSignup = async (e) => {
    e.preventDefault();
    const data = {
        userName: e.target.userName.value,
        email: e.target.email.value,
        password: e.target.password.value
    }
    await axios.post(`https://whiteboard-401.herokuapp.com/signup`, data,{
      headers: {
        Authorization: `Bearer ${cookies.load("token")}`,
  }}).then(res => {
        console.log(res)
        alert("Your Rigisterd Now Please Sign In!")
    }).catch(e => console.log(e))
}
  
    return (
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={handleSignup}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign Up</h3>
            <div className="text-center">
              Already registered?{" "}
              <span className="link-primary" >
              <Link to="/signin">Sign In</Link>
              </span>
            </div>
            <div className="form-group mt-3">
              <label>User Name</label>
              <input
                type="userName"
                name='userName'
                className="form-control mt-1"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group mt-3">
              <label>Email</label>
              <input
                type="email"
                name='email'
                className="form-control mt-1"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                name='password'
                className="form-control mt-1"
                placeholder="Enter password"
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary" >
                Submit
              </button>
            </div>
            <p className="text-center mt-2">
              Forgot <a href="#">password?</a>
            </p>
          </div>
        </form>
      </div>
    )
  

  
}