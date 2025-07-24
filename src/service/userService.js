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
    console.log(error);
  }
};
// export const getFollowing = async ({ page }) => {
//   try {
//     const res = await request.get("me/followings", {
//       params: {
//         page,
//       },
//     });
//     return res.data;
//   } catch (error) {
//     console.log(error);
//   }
// };
