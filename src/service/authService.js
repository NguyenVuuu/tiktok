import * as request from "~/utils/request";

export const register = async (email, password) => {
  try {
    const res = await request.register("auth/register", {});
  } catch (error) {}
};

export const login = async (email, password) => {
  try {
    const res = await request.login("auth/login", {});
  } catch (error) {}
};

export const getCurrentUser = async (token) => {
  try {
    const res = await request.getCurrentUser("auth/me", {});
  } catch (error) {}
};
export const updateProfile = async () => {};
