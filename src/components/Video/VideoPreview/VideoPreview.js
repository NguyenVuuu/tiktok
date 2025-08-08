import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { useRef } from "react";

import { LikeActiveIcon } from "~/components/Icon";
import styles from "./VideoPreview.module.scss";

const cx = classNames.bind(styles);

function VideoPreview({ data }) {
  const videoRef = useRef();
  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div
          className={cx("video-container")}
          onMouseEnter={() => videoRef.current.play()}
        >
          <div className={cx("video-inner")}>
            <div className={cx("image")}>
              <img src={data.thumb_url} alt="" />
            </div>
            <div className={cx("video")}>
              <video
                muted
                loop
                playsInline
                preload="metadata"
                ref={videoRef}
                src={data.file_url}
              />
            </div>
            <div className={cx("views")}>
              <LikeActiveIcon className={cx("like-icon")} />
              <strong className={cx("count")}>{data.likes_count}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

VideoPreview.propTypes = {
  data: PropTypes.array.isRequired,
};

export default VideoPreview;
