import { useEffect, useState } from "react";
import Video from "~/components/Video";
import * as videoService from "~/service/videoService";

function Home() {
  const [listVideos, setListVideos] = useState([]);
  const [pages, setPages] = useState(1);
  useEffect(() => {
    // const fetchApi = async () => {
    //   const res = await videoService.getVideos();
    //   console.log(res);
    // };
    // fetchApi();

    videoService
      .getVideos({ type: "for-you", page: pages })
      .then((data) => {
        setListVideos((prevVideos) => [...prevVideos, ...data]);
      })
      .catch((error) => console.log(error));
  }, [pages]);

  const handleScroll = () => {
    if (window.scrollY + window.innerHeight >= document.body.offsetHeight) {
      setPages((pages) => pages + 1);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <div className="wrapper">
      {listVideos.map((video) => {
        return <Video key={video.id} data={video} />;
      })}
    </div>
  );
}

export default Home;
