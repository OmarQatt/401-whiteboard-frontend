
import axios from "axios";
import React, { useState } from "react"

export default function (props) {
const handleSignup = async (e) => {
    e.preventDefault();
    const data = {
        userName: e.target.userName.value,
        email: e.target.email.value,
        password: e.target.password.value
    }
    await axios.post('https://whiteboard-401.herokuapp.com/signup', data).then(res => {
        console.log(res)
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
                Sign In
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