import {actionType} from '../../config/constant';

export const AuthReducer = (state, action) => {
  switch (action.type) {
    case actionType.REQUEST_LOGIN:
      return {
        ...state,
        loading: true
      }
    case actionType.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        token: action.payload.token,
        loading: false,
        isAuth: true
      }
    case actionType.LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
        isAuth: false
      }
    case actionType.LOGOUT:
      return {
        ...state,
        user: {},
        isAuth: false,
        token: ''
      }
    default:
      throw new Error(`Unkown action type: ${action.type}`)
  }
}