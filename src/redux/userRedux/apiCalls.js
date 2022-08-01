import {
  loginFailure,
  loginStart,
  loginSuccess,
  logoutUser,
} from "./userRedux";

import { userRequest, publicRequest } from "../../utils/requestMethods";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
    window.location.reload();
  } catch (error) {
    dispatch(loginFailure(error?.response?.data));
  }
};

export const logout = async (dispatch, user) => {
  try {
    const res = await userRequest.post("/auth/logout", user.refreshToken);
    dispatch(logoutUser(res.data));
  } catch (err) {}
};

// export const refreshToken = async (dispatch, user) => {
//   try {
//     const res = await userRequest.post("/auth/refreshtoken", user.refreshToken);
//     console.log(res.data);
//   } catch (error) {}
// };
