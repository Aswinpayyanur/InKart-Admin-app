import {
   
    LOGIN,
    SIGNOUT,
    UPDATEPROFILE,
  } from './constants';
  
  export const login = data => (
    {
    type: LOGIN,
    payload: {
      userId: data.userId,
      userName: data.userName,
      email: data.email,
      profileImage: data.profileImage,
    },
  });
  
  export const signout = data => ({
    type: SIGNOUT,
    payload: {},
  });

  export const updateProfile = data => (
    {
    type: UPDATEPROFILE,
    payload: {
      userId: data.userId,
      userName: data.userName,
      email: data.email,
      profileImage: data.profileImage,
    },
  });
  
