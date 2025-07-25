import * as request from "~/utils/request";
export const getVideos = async ({ type, page }) => {
  try {
    const res = await request.get("videos", {
      params: {
        type,
        page,
      },
    });
    return res.data;
  } catch (error) {
    console.log("videos service: ", error);
  }
};
