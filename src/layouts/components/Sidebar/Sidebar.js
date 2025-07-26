import { useEffect, useState } from "react";
import classNames from "classnames/bind";

import styles from "./Sidebar.module.scss";
import config from "~/config";
import Menu, { MenuItem } from "./Menu";
import * as userService from "~/service/userService";
import {
  CompassActiveIcon,
  CompassIcon,
  HomeActiveIcon,
  HomeIcon,
  LiveActiveIcon,
  LiveIcon,
  UserGroupActiveIcon,
  UserGroupIcon,
} from "~/components/Icon";
import SuggestedAccounts from "~/components/SuggestedAccounts";
import Button from "~/components/Button";

const PER_PAGE = 5;
function Sidebar() {
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [seeMore, setSeeMore] = useState(true);

  //call api suggested
  useEffect(() => {
    userService
      .getSuggested({ page: 1, perPage: PER_PAGE })
      .then((data) => {
        setSuggestedUsers((prevUsers) => [...prevUsers, ...data]);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (!seeMore) {
      userService
        .getSuggested({ page: 2, perPage: PER_PAGE })
        .then((data) => {
          setSuggestedUsers((prevUsers) => [...prevUsers, ...data]);
        })
        .catch((error) => console.log(error));
    } else {
      setSuggestedUsers((prevUsers) => prevUsers.slice(0, PER_PAGE));
    }
  }, [seeMore]);
  const cx = classNames.bind(styles);

  return (
    <aside className={cx("wrapper")}>
      <Menu>
        <MenuItem
          title="For You"
          to={config.routes.home}
          icon={<HomeIcon />}
          activeIcon={<HomeActiveIcon />}
        />
        <MenuItem
          title="Following"
          to={config.routes.follow}
          icon={<UserGroupIcon />}
          activeIcon={<UserGroupActiveIcon />}
        />
        <MenuItem
          title="LIVE"
          to={config.routes.live}
          icon={<LiveIcon />}
          activeIcon={<LiveActiveIcon />}
        />
        <MenuItem
          title="EXPLORE"
          to={config.routes.explore}
          icon={<CompassIcon />}
          activeIcon={<CompassActiveIcon />}
        />
      </Menu>

      <SuggestedAccounts label="Suggested accounts" data={suggestedUsers} />

      {seeMore ? (
        <div>
          <p className={cx("more-btn")} onClick={() => setSeeMore(false)}>
            See more
          </p>
        </div>
      ) : (
        <div>
          <p className={cx("more-btn")} onClick={() => setSeeMore(true)}>
            See less
          </p>
        </div>
      )}
      {/* <SuggestedAccounts label="Following accounts" /> */}
      <footer className={cx("footer")}>
        <div className={cx("footer-content")}>
          <h3>Công ty</h3>
          <h3>Chương trình</h3>
          <h3>Điều khoản và chính sách</h3>
          <span>© 2025 TikTok</span>
          <p>Make By Nguyên Vũ</p>
        </div>
      </footer>
    </aside>
  );
}

export default Sidebar;
