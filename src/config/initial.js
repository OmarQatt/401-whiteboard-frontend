export const newsState = [];


const userInfo = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : {};
const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';

export const initialState = {
  user: userInfo,
  token: token,
  errorMessage: null,
  loggedin: token ? true : false,
  loading: false
};