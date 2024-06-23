import {LOGIN, SIGNOUT, UPDATEPROFILE} from './constants';

const initialState = {
  userId: '',
  isLoggedIn: false,
  userName: '',
  email: '',
  profileImage: '',
};
export const inKartReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        userId: action.payload.userId,
        userName: action.payload.userName,
        email: action.payload.email,
        profileImage: action.payload.profileImage,
        isLoggedIn: true,
      };
    case SIGNOUT:
      return {
        ...state,
        userId: '',
        isLoggedIn: false,
      };
    case UPDATEPROFILE:
      return {
        ...state,
        userId: action.payload.userId,
        userName: action.payload.userName,
        email: action.payload.email,
        profileImage: action.payload.profileImage,
        isLoggedIn: true,
      };
    default:
      return state;
  }
};
