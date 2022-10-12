import axios from "axios";
import { actionType } from "../config/constant";
import cookies from 'react-cookies'
export const login = (dispatch, payload) => {
    try {
      dispatch({ type: actionType.REQUEST_LOGIN })
      axios.post(`${process.env.REACT_APP_HOST}/login`, {}, {
        headers: {
          Authorization: `Basic ${payload}`
        }
      })
        .then(res => {
            
          dispatch({type: actionType.LOGIN_SUCCESS, payload: res.data});
          localStorage.setItem('currentUser', JSON.stringify(res.data));
          localStorage.setItem('token', res.data.token);
        })
        .catch(err => dispatch({type: actionType.LOGIN_FAILED, payload: err}));
      }catch(e) {
        dispatch({type: actionType.LOGIN_FAILED, payload: e});   
    }
  }

 export const fetchUser = async (dispatch) => {
        await axios.get(`${process.env.REACT_APP_HOST}/users`, {}, {
            headers: {
                Authorization: `Bearer ${cookies.load("token")}`,
            }
        }).then((res) => {
            dispatch({ type: actionType.GET_USERS, payload: res.data });
            console.log("done getting user info");
          });
    }

  export const logoutHandler = (dispatch) => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    dispatch({ type: actionType.LOGOUT });
  }