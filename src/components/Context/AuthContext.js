import  React,{useReducer, useState } from 'react';
import { createContext } from 'react'
import axios from 'axios';
import base64 from 'base-64'
import cookies from 'react-cookies'
import {AuthReducer } from '../Reducer/authReducer'
import {initialState} from '../../config/initial'
import {login, logoutHandler, fetchUser} from '../../actions/authActions'
export const authContext = createContext();

const AuthContextProvider = (props) => {

    // const [loggedin, setLoggedin] = useState(false);
    const [posts, setPosts] = useState('');
    const [showPostComponent, setShowPostComponent] = useState(false);
    // const [roles, setRoles] = useState('');
    // const [user, setUser] = useState({});
    // const [ilities, setCapabilities] = useState();

    const [user, dispatch] = useReducer(AuthReducer, initialState)

    const handleLogin = async (e) => {
        e.preventDefault();
        const data = {

            email: e.target.email.value,
            password: e.target.password.value
        }

        const encodedCredintial = base64.encode(`${data.email}:${data.password}`)
        
        login(dispatch, encodedCredintial)
       
        console.log(user)
    }

    const handleSignup = async (e) => {
        e.preventDefault();
        const data = {
            userName: e.target.userName.value,
            email: e.target.email.value,
            password: e.target.password.value
        }
        await axios.post(`${process.env.REACT_APP_HOST}/signup`, data).then(res => {
            console.log(res)
            alert("Your Rigisterd Now Please Sign In!")
        }).catch(e => console.log(e))
    }

    // const fetchUser = async () => {
    //     await axios.get(`${process.env.REACT_APP_HOST}/users`, {}, {
    //         headers: {
    //             Authorization: `Bearer ${cookies.load("token")}`,
    //         }
    //     }).then(res => setUser(res.data)).catch(e => console.log(e))
    // }

    const logout = () => {
        logoutHandler(dispatch);
    }

    const allPost = `${process.env.REACT_APP_HOST}/`;
    const getAllPost = async () => {
        try {

            axios
                .get(`${allPost}getPostComment`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
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
       
      fetchUser(dispatch)
      getAllPost();      
    }
    }

    

    const value = { logout,
         handleSignup,
          handleLogin, 
         posts, getAllPost, showPostComponent, deleteComment,
          editPost, deletePost, user,
           fetchUser,
           checkToken}
    return (
        <authContext.Provider value={value}>
            {props.children}
        </authContext.Provider>
    )
}

export default AuthContextProvider