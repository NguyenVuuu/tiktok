import * as request from "~/utils/request";

export const register = async (email, password) => {
  let result = {
    success: false,
    message: "",
    data: null,
  };
  try {
    const data = await request.register("auth/register", {
      type: "email",
      email,
      password,
    });
    result = {
      ...result,
      success: true,
      data,
    };
  } catch (error) {
    result = {
      ...result,
      message: "Account already exists",
    };
    console.log("register service: ", error);
  }
  return result;
};

export const login = async (email, password) => {
  try {
    const res = await request.login("auth/login", {});
  } catch (error) {}
};

export const getCurrentUser = async (token) => {
  try {
    const res = await request.getCurrentUser("auth/me", {});
  } catch (error) {
    console.log("getCurrentUser service: ", error);
  }
};
export const updateProfile = async (token) => {
  try {
    const res = await request.updateProfile("auth/me?_method=PATCH", {});
  } catch (error) {
    console.log("updateProfile service: ", error);
  }
};
