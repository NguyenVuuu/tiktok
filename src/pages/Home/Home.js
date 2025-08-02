import { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

import Video from "~/components/Video";
import styles from "./Home.module.scss";
import * as videoService from "~/service/videoService";

const cx = classNames.bind(styles);

function Home() {
  //lấy volume từ local storage
  const savedVolume = JSON.parse(localStorage.getItem("volumeTiktok")) ?? 0.5;
  const [listVideos, setListVideos] = useState([]);
  const [pages, setPages] = useState(1);
  const [volume, setVolume] = useState(0);
  const [prevVolume, setPrevVolume] = useState(savedVolume);
  const [mute, setMute] = useState(true);
  const [disabled, setDisabled] = useState(false);

  const wrapperRef = useRef();

  //api video
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

  // lưu volume vào local storage (key: volumeTiktok)
  useEffect(() => {
    localStorage.setItem("volumeTiktok", JSON.stringify(volume));
  }, [volume]);

  const handleSliderVolume = (e) => {
    const newVolume = e.target.value / 100;
    setVolume(newVolume);
    setMute(newVolume === 0);
    if (newVolume > 0) {
      setPrevVolume(newVolume);
    }

    //lưu volume mới vào local storage (key: TiktokVolume)
    localStorage.setItem("TiktokVolume", JSON.stringify(newVolume));
  };

  const toggleVolume = () => {
    if (mute) {
      //lấy volume từ local storage, nếu ko có thì lấy giá trị mặc định là 0.5
      const stored = JSON.parse(localStorage.getItem("TiktokVolume")) ?? 0.5;
      const restoredVolume = stored > 0 ? stored : 0.5;
      setVolume(restoredVolume);
      setMute(false);
    } else {
      setPrevVolume(volume);
      setVolume(0);
      setMute(true);
    }
  };

  // lắng nghe sự kiện scroll
  // mỗi khi scroll đến cuối trang thì tăng pages lên 1
  // const handleScroll = () => {
  //   if (window.scrollY + window.innerHeight >= document.body.offsetHeight) {
  //     setPages((pages) => pages + 1);
  //   }
  // };
  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // });

  const handleScroll = () => {
    const wrapper = wrapperRef.current;
    if (
      wrapper &&
      wrapper.scrollTop + wrapper.clientHeight >= wrapper.scrollHeight - 100
    ) {
      setPages((pages) => pages + 1);
    }
  };

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (wrapper) {
      wrapper.addEventListener("scroll", handleScroll);
      return () => wrapper.removeEventListener("scroll", handleScroll);
    }
  }, []);
  return (
    <div ref={wrapperRef} className={cx("wrapper")}>
      {listVideos.map((video) => {
        return (
          <div key={video.id} className={cx("video-wrapper")}>
            <Video
              data={video}
              volume={volume}
              mute={mute}
              handleSliderVolume={handleSliderVolume}
              toggleVolume={toggleVolume}
            />
          </div>
        );
      })}

      <div className={cx("scroll-buttons")}>
        <button className={cx("up-btn")}>
          <FontAwesomeIcon icon={faAngleUp} className={cx("icon")} />
        </button>
        <button className={cx("down-btn")}>
          <FontAwesomeIcon icon={faAngleDown} className={cx("icon")} />
        </button>
      </div>
    </div>
  );
}

export default Home;
