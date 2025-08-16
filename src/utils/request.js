import axios from "axios";

// console.log(process.env.REACT_APP_BASE_URL);

const request = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const get = async (path, options = {}) => {
  const response = await request.get(path, options);
  return response.data;
};

export const login = async (path, option = {}) => {
  const response = await request.post(path, option);

  return response;
};

export const register = async (path, option = {}) => {
  const response = await request.post(path, option);
  return response;
};

export const getCurrentUser = async (path, option = {}) => {
  const response = await request.get(path, option);

  if (response.status !== 200) {
    throw Error("Network response was not ok! - GET CURRENT USER");
  }

  return response;
};
export default request;
