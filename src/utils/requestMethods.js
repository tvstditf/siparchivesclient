import axios from "axios";

// const BASE_URL = "http://localhost:8300/api/";
// const BASE_URL = "http://20.20.20.30:8000/api/";
const BASE_URL = "https://tvstditfsiparchive.herokuapp.com/";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

let TOKEN = "";

if (localStorage.getItem("persist:root")) {
  TOKEN = JSON?.parse(
    JSON?.parse(localStorage.getItem("persist:root"))?.user || "{}"
  )?.currentUser?.accessToken;
}

//Refresh Token
// `let REFRESHTOKEN = "";

// if (localStorage.getItem("persist:root")) {
//   REFRESHTOKEN = JSON?.parse(
//     JSON?.parse(localStorage.getItem("persist:root"))?.user || "{}"
//   )?.currentUser?.refreshToken;
// }`
// console.log(REFRESHTOKEN);

// const axiosJWT = axios.create();

// axiosJWT.interceptors.request.use(
//   async (config) => {
//     let currentDate = new Date();

//     const decodedToken = jwt_decode(REFRESHTOKEN);
//     if (decodedToken.exp * 1000 < currentDate.getTime()) {
//       const data = await refreshToken();

//       config.headers["authorization"] = "Bearer " + data.accessToken;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
