import { React, useState } from 'react';
import { createContext } from 'react'
import axios from 'axios';
import base64 from 'base-64'
import cookies from 'react-cookies'

export const authContext = createContext();

const AuthContextProvider = (props) => {

    const [loggedin, setLoggedin] = useState(false);
    const [posts, setPosts] = useState('');
    const [showPostComponent, setShowPostComponent] = useState(false);
    const [roles, setRoles] = useState('');
    const [user, setUser] = useState({});
    const [capabilities, setCapabilities] = useState();
    const handleLogin = async (e) => {
        e.preventDefault();
        const data = {

            username: e.target.email.value,
            password: e.target.password.value
        }

        const encodedCredintial = base64.encode(`${data.username}:${data.password}`)
        console.log(`Basic ${encodedCredintial}`)
        await axios.post(`${process.env.REACT_APP_HOST}/login`, {}, {
            headers: {
                Authorization: `Basic ${encodedCredintial}`
            }
        }).then(res => {
            setUser(res.data)
            console.log(res.data)
            cookies.save('token', res.data.token);
            cookies.save('userID', res.data.id)
            cookies.save('userName', res.data.userName)
            cookies.save('role', res.data.role)
            cookies.save('capabilities', JSON.stringify(res.data.capabilities))
           
            setLoggedin(true)
        })
            .catch(err => console.log(err))
    }

    const handleSignup = async (e) => {
        e.preventDefault();
        const data = {
            userName: e.target.userName.value,
            email: e.target.email.value,
            password: e.target.password.value
        }
        await axios.post(`${process.env.REACT_APP_HOST}/signup`, data, {
            headers: {
                Authorization: `Bearer ${cookies.load("token")}`,
            }
        }).then(res => {
            console.log(res)
            alert("Your Rigisterd Now Please Sign In!")
        }).catch(e => console.log(e))
    }

    const fetchUser = async () => {
        await axios.get(`${process.env.REACT_APP_HOST}/users`, {}, {
            headers: {
                Authorization: `Bearer ${cookies.load("token")}`,
            }
        }).then(res => setUser(res.data)).catch(e => console.log(e))
    }

    const logout = () => {
        cookies.remove('token')
        cookies.remove('userID')
        cookies.remove('userName')
        cookies.remove('role')
        setLoggedin(false)
    }

    const allPost = `${process.env.REACT_APP_HOST}/`;
    const getAllPost = async () => {
        try {

            axios
                .get(`${allPost}getPostComment`, {
                    headers: {
                        Authorization: `Bearer ${cookies.load('token')}`
                    }
                })
                .then((response) => {
                    const allPosts = response.data;
                    console.log(response.data)
                    setPosts(allPosts);                  
                    setShowPostComponent(true);
                }
                ).catch((error) => console.error(`Error: ${error}`));

        } catch (e) { console.log(e) }

    };

    const deletePost = async (id) => {
        await axios.delete(`${process.env.REACT_APP_HOST}/post/${id}`, {
            headers: {
                Authorization: `Bearer ${cookies.load("token")}`,
            }
        });
        getAllPost();
    };
    const deleteComment = async (id) => {
        await axios.delete(`${process.env.REACT_APP_HOST}/comment/${id}`, {
            headers: {
                Authorization: `Bearer ${cookies.load("token")}`,
            }
        });
        getAllPost();
    };
    const editPost = async (id, obj) => {
        await axios.put(`${process.env.REACT_APP_HOST}/post/${id}`, {
            headers: {
                Authorization: `Bearer ${cookies.load("token")}`,
            }
        });
        getAllPost();
    }
    const checkToken = () => {
        const token = cookies.load('token')
        const role = cookies.load('role')
    if (token) {
        setLoggedin(true)
        setRoles(role)
        setCapabilities(cookies.load('capabilities'))
      fetchUser()
      getAllPost();      
    }
    }

    

    const value = { loggedin, logout, handleSignup, handleLogin, setLoggedin,
         posts, getAllPost, showPostComponent, roles, setRoles, deleteComment,
          editPost, deletePost, user, fetchUser, capabilities, checkToken}
    return (
        <authContext.Provider value={value}>
            {props.children}
        </authContext.Provider>
    )
}

export default AuthContextProvider