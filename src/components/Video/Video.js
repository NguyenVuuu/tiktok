import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

import {
  EllipsisHorizontalIcon,
  Icon_Comment,
  LikeActiveIcon,
  MuteIcon,
  PauseIcon,
  PlaySolidIcon,
  ShareSolidIcon,
  UnMuteIcon,
} from "../Icon";
import styles from "./Video.module.scss";
import Button from "../Button";
import Image from "../Image";

const cx = classNames.bind(styles);

function Video({ data = [], volume, mute, handleSliderVolume, toggleVolume }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [showCenterIcon, setShowCenterIcon] = useState(false);
  const [centerIconType, setCenterIconType] = useState("play");

  const videoRef = useRef();
  const { ref, inView } = useInView({
    threshold: 0.75,
  });

  useEffect(() => {
    if (videoRef.current) {
      // set muted
      videoRef.current.muted = mute;
      // set volume, nếu muted thì volume = 0, nếu ko muted thì volume = volume
      videoRef.current.volume = mute ? 0 : volume;
    }
  }, [volume, mute]);
  const playVideo = () => {
    if (!isPlaying) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const pauseVideo = () => {
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleVideo = () => {
    if (!isPlaying) {
      playVideo();
      setCenterIconType("pause");
    } else {
      pauseVideo();
      setCenterIconType("play");
    }

    setShowCenterIcon(true);
    setTimeout(() => {
      setShowCenterIcon(false);
    }, 600);
  };
  useEffect(() => {
    if (inView) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [inView]);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("user")}>
        <div className={cx("user-info")}>
          <Link to={`/@${data.user.nickname}`}>
            <Image
              className={cx("avatar")}
              src={data.user.avatar}
              alt={data.user.full_name}
            />
          </Link>
          <div className={cx("item-info")}>
            <Link to={`/@${data.user.nickname}`}>
              <p className={cx("nickname")}>
                <strong>{data.user.nickname}</strong>{" "}
                <span className={cx("name")}>
                  {data.user.first_name} {data.user.last_name}
                </span>
              </p>
            </Link>
            <p className={cx("description")}>{data.description}</p>
            <div className={cx("music")}>
              <FontAwesomeIcon icon={faMusic} /> <span>{data.music}</span>
            </div>
          </div>
        </div>
        <div>
          <Button outline>Follow</Button>
        </div>
      </div>
      <div className={cx("video")}>
        <div className={cx("video-container")}>
          <div className={cx("video-content")} ref={ref}>
            <video
              src={data?.file_url}
              loop
              ref={videoRef}
              onClick={toggleVideo}
            />
            {showCenterIcon && (
              <div className={cx("center-icon")}>
                {centerIconType === "play" ? <PauseIcon /> : <PlaySolidIcon />}
              </div>
            )}

            <img src={data?.thumb_url} alt={data?.thumb_url} />
          </div>

          <div className={cx("volume-container", { active: mute })}>
            <div className={cx("volume-slider")}>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                orient="vertical"
                value={volume * 100}
                onChange={handleSliderVolume}
              />
            </div>
            <div className={cx("volume-btn")} onClick={toggleVolume}>
              {mute || volume === 0 ? <MuteIcon /> : <UnMuteIcon />}
            </div>
          </div>
          <div className={cx("more-btn")}>
            <EllipsisHorizontalIcon />
          </div>
        </div>
        <div className={cx("video-interaction")}>
          <button className="like">
            <LikeActiveIcon />
          </button>
          <strong>{data.likes_count}</strong>
          <button className="comment">
            <Icon_Comment />
          </button>
          <strong>{data.comments_count}</strong>

          <button className="share">
            <ShareSolidIcon />
          </button>
          <strong>{data.shares_count}</strong>
        </div>
      </div>
    </div>
  );
}

Video.propTypes = {
  data: PropTypes.object.isRequired,
};
export default Video;
