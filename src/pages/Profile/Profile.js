import { useEffect, useRef, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";

import * as userService from "~/service/userService";
import styles from "./Profile.module.scss";
import Image from "~/components/Image";
import Button from "~/components/Button";
import { EllipsisHorizontalIcon, ShareWhiteIcon } from "~/components/Icon";
import VideoPreview from "~/components/Video/VideoPreview";

const cx = classNames.bind(styles);

function Profile() {
  const [userProfile, setUserProfile] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [activeTab, setActiveTab] = useState("video");

  const tabs = [
    { id: "video", label: "Video" },
    { id: "repost", label: "Bài đăng lại" },
    { id: "liked", label: "Đã thích" },
  ];

  const tabRefs = useRef({});

  const [hoveredTab, setHoveredTab] = useState(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });

  const location = useLocation();
  const navigate = useNavigate();
  const { nickname } = useParams();
  // Lấy nickname từ URL params
  const data = location.state;
  // Lấy nickname từ location.state

  // Lấy nickname từ URL hoặc từ location.state
  const targetNickname = nickname || data?.nickname;

  //fetch api
  useEffect(() => {
    // check nickname null
    if (!targetNickname) {
      setError("Không tìm thấy thông tin người dùng");
      return;
    }

    const fetchUserProfile = async () => {
      setLoading(true);
      setError(null);

      try {
        const profileData = await userService.getProfile({
          nickname: targetNickname,
        });
        setUserProfile(profileData);
        setVideos(profileData.videos || []);
      } catch (err) {
        console.error("Lỗi khi fetch profile:", err);
        setError("Không thể tải thông tin người dùng");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [targetNickname]);

  //cập nhật bottom-line khi hover
  useEffect(() => {
    const currentId = hoveredTab || activeTab;
    const tab = tabRefs.current[currentId];
    if (tab) {
      const { offsetLeft, offsetWidth } = tab;
      setIndicatorStyle({ left: offsetLeft, width: offsetWidth });
    }
  }, [hoveredTab, activeTab]);

  // cập nhật bottom-line khi resize
  useEffect(() => {
    const handleResize = () => {
      const currentId = hoveredTab || activeTab;
      const tab = tabRefs.current[currentId];
      if (tab) {
        const { offsetLeft, offsetWidth } = tab;
        setIndicatorStyle({ left: offsetLeft, width: offsetWidth });
      }
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    };
  }, [hoveredTab, activeTab]);

  // cập nhật kích thước ban đầu của bottom-line
  useEffect(() => {
    if (!userProfile) {
      return;
    }
    const currentId = hoveredTab || activeTab;
    const tab = tabRefs.current[currentId];

    if (tab) {
      setIndicatorStyle({ left: tab.offsetLeft, width: tab.offsetWidth });
    }
  }, [userProfile]);

  if (error) {
    return (
      <div className={cx("wrapper")}>
        <div className={cx("error")}>
          <h3>Lỗi</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={cx("wrapper")}>
        <div className={cx("loading")}>
          <p>Đang tải thông tin người dùng...</p>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className={cx("wrapper")}>
        <div className={cx("error")}>
          <p>Không tìm thấy thông tin người dùng</p>
        </div>
      </div>
    );
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("user-info")}>
          <div>
            <Image
              src={userProfile.avatar}
              alt={userProfile.nickname}
              className={cx("avatar")}
            />
          </div>
          <div className={cx("info")}>
            <div className={cx("user-identifier")}>
              <div className={cx("user-text")}>
                <div className={cx("user-text")}>
                  <h1 className={cx("nickname")}>{userProfile.nickname}</h1>
                  {userProfile.tick && (
                    <FontAwesomeIcon
                      className={cx("check")}
                      icon={faCircleCheck}
                    />
                  )}
                </div>
                <h2 className={cx("name")}>
                  {userProfile.first_name} {userProfile.last_name}
                </h2>
              </div>
            </div>
            <div className={cx("button-pane")}>
              <div>
                <Button primary>Follow</Button>
              </div>
              <a>
                <Button basic>Tin Nhắn</Button>
              </a>
              <div>
                <Button basic verysmall>
                  <ShareWhiteIcon />
                </Button>
              </div>
              <div>
                <Button basic verysmall>
                  <EllipsisHorizontalIcon />
                </Button>
              </div>
            </div>
            <div className={cx("stats")}>
              <h3 className={cx("count-info")}>
                <div className={cx("number")}>
                  <strong>{userProfile.followings_count}</strong>
                  <span>Đã follow</span>
                </div>
                <div className={cx("number")}>
                  <strong>{userProfile.followers_count}</strong>
                  <span>Follower</span>
                </div>
                <div className={cx("number")}>
                  <strong>{userProfile.likes_count}</strong>
                  <span>Lượt thích</span>
                </div>
              </h3>
              <h2 className={cx("bio")}>{userProfile.bio}</h2>
            </div>
          </div>
        </div>
        <div className={cx("video-preview")}>
          <div className={cx("feed-tab-wrapper")}>
            <div className={cx("feed-tab")}>
              {tabs.map((tab) => {
                return (
                  <p
                    key={tab.id}
                    className={cx("feed-tab-item", {
                      active: activeTab === tab.id,
                    })}
                    ref={(ref) => (tabRefs.current[tab.id] = ref)}
                    onClick={() => handleTabChange(tab.id)}
                    onMouseEnter={() => setHoveredTab(tab.id)}
                    onMouseLeave={() => setHoveredTab(null)}
                  >
                    <span>{tab.label}</span>
                  </p>
                );
              })}
              <div
                className={cx("bottom-line")}
                style={{
                  width: indicatorStyle.width,
                  transform: `translateX(${indicatorStyle.left}px)`,
                }}
              ></div>
            </div>
            {/* <div className={cx("segmented-control")}>
              <Button className={cx("segmented-btn")}>
                <div className={cx("segmented-item")}>
                  <div className={cx("segmented-item-title")}>Mới nhất</div>
                </div>
              </Button>
              <Button className={cx("segmented-btn")}>
                <div className={cx("segmented-item")}>
                  <div className={cx("segmented-item-title")}>Thịnh Hành</div>
                </div>
              </Button>
              <Button className={cx("segmented-btn")}>
                <div className={cx("segmented-item")}>
                  <div className={cx("segmented-item-title")}>Cũ nhất</div>
                </div>
              </Button>
            </div> */}
          </div>
          {/* {videos.map((video) => {
            return <VideoPreview data={video} key={video.id} />;
          })} */}
          {videos.map((video) => {
            return <VideoPreview key={video.id} data={video} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Profile;
