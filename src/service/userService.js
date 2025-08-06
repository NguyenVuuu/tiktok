import * as request from "~/utils/request";
//nhận 2 tham số
// page (trang muốn lấy)
// perPage (số lượng user muốn lấy)
export const getSuggested = async ({ page, perPage }) => {
  try {
    const res = await request.get("users/suggested", {
      params: {
        page,
        per_page: perPage,
      },
    });
    return res.data;
  } catch (error) {
    console.log("getSuggested service: ", error);
  }
};

// export const getFollowing = async ({ token, page }) => {
//   try {
//     const res = await request.get("me/followings", {
//       params: {
//         page,
//       },headers:{
//         Authorization: `Bearer ${token}`,
//       }
//     });
//     return res.data;
//   } catch (error) {
//     console.log(error);
//   }
// };

// Fetch profile của user theo nickname
export const getProfile = async ({ nickname }) => {
  try {
    const res = await request.get(`users/@${nickname}`);
    return res.data;
  } catch (error) {
    console.log("getProfile service: ", error);
    throw error;
  }
};
