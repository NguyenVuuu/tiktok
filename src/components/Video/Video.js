import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import classNames from "classnames/bind";

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
import Image from "../Image";

const cx = classNames.bind(styles);

function Video({
  data = [],
  volume,
  mute,
  handleSliderVolume,
  toggleVolume,
  onInView,
}) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [showCenterIcon, setShowCenterIcon] = useState(false);
  const [centerIconType, setCenterIconType] = useState("play");
  const [followed, setFollowed] = useState(false);

  const videoRef = useRef();
  const { ref, inView } = useInView({
    threshold: 1,
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
    if (onInView) {
      onInView(inView);
    }
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
          <div className={cx("profile")}>
            <Link to={`/@${data.user.nickname}`}>
              <Image
                className={cx("avatar")}
                src={data.user.avatar}
                alt={data.user.full_name}
              />
            </Link>
            <span className={cx("follow-btn", { followed: followed })}>
              {followed ? (
                <FontAwesomeIcon icon={faCheck} className={cx("icon")} />
              ) : (
                <FontAwesomeIcon icon={faPlus} className={cx("icon")} />
              )}
            </span>
          </div>
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
