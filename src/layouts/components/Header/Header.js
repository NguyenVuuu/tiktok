import { useState } from "react";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import config from "~/config";
import Button from "~/components/Button";
import logo from "~/assests/images/logo.svg";
import Menu from "~/components/Popper/Menu";
import styles from "./Header.module.scss";
import {
  CoinIcon,
  HelpIcon,
  InboxIcon,
  LanguageIcon,
  LogoutIcon,
  MessageIcon,
  ProfileIcon,
  SettingsIcon,
  ShortcutsIcon,
  UploadIcon,
} from "~/components/Icon";
import Image from "~/components/Image";
import { Link } from "react-router-dom";
import Search from "../Search";
import AuthModal from "~/components/Modal/AuthModal";

const cx = classNames.bind(styles);

const MENU_ITEMS = [
  {
    icon: <LanguageIcon />,
    title: "English",
    children: {
      title: "Language",
      data: [
        { type: "language", code: "en", title: "English" },
        { type: "language", code: "vi", title: "Tiếng Việt" },
        { type: "language", code: "vi", title: "Tiếng Việt" },
        { type: "language", code: "vi", title: "Tiếng Việt" },
        { type: "language", code: "vi", title: "Tiếng Việt" },
        { type: "language", code: "vi", title: "Tiếng Việt" },
        { type: "language", code: "vi", title: "Tiếng Việt" },
        { type: "language", code: "en", title: "English" },
        { type: "language", code: "vi", title: "Tiếng Việt" },
      ],
    },
  },
  {
    icon: <HelpIcon />,
    title: "Feedback and Help",
    to: "/feedback",
  },
  {
    icon: <ShortcutsIcon />,
    title: "Keyboard shortcuts",
  },
];
function Header() {
  const currentUser = false;
  const [openAuth, setOpenAuth] = useState(false);

  //handle logic
  const handleMenuChange = (menuItem) => {
    switch (menuItem.length) {
      case "language":
        break;
      default:
        break;
    }
  };
  const userMenu = [
    {
      icon: <ProfileIcon />,
      title: "View profile",
      to: "/profile",
    },
    {
      icon: <CoinIcon />,
      title: "Get coins",
      to: "/coin",
    },
    {
      icon: <SettingsIcon />,
      title: "Settings",
      to: "/setting",
    },
    ...MENU_ITEMS,
    {
      icon: <LogoutIcon />,
      title: "Log out",
      horizontal: true,
    },
  ];
  return (
    <>
      <header className={cx("wrapper")}>
        <div className={cx("inner")}>
          <Link to={config.routes.home} className={cx("logo-link")}>
            <img src={logo} alt="tiktok" />
          </Link>

          {/* search */}
          <Search />

          <div className={cx("actions")}>
            {currentUser ? (
              //render giao diện đã đăng nhập
              <>
                <Tippy
                  delay={[0, 200]}
                  content="Upload video"
                  placement="bottom"
                >
                  <button className={cx("action-btn")}>
                    <UploadIcon />
                  </button>
                </Tippy>
                <Tippy delay={[0, 200]} content="Message" placement="bottom">
                  <button className={cx("action-btn")}>
                    <MessageIcon />
                  </button>
                </Tippy>
                <Tippy delay={[0, 200]} content="Inbox" placement="bottom">
                  <button className={cx("action-btn")}>
                    <InboxIcon />
                    <span className={cx("badge")}>8</span>
                  </button>
                </Tippy>
              </>
            ) : (
              //render giao diện chưa đăng nhập
              <>
                <Button text onClick={() => setOpenAuth(true)}>
                  Upload
                </Button>
                <Button primary onClick={() => setOpenAuth(true)}>
                  Log in
                </Button>
              </>
            )}
            <Menu
              items={currentUser ? userMenu : MENU_ITEMS}
              onClick={handleMenuChange}
            >
              {currentUser ? (
                //avt
                <Image
                  src="https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/42067ded2f44c998e97df9c9c2c75458~tplv-tiktokx-cropcenter:100:100.jpeg?dr=14579&refresh_token=6929d5b4&x-expires=1751968800&x-signature=ogbnC5LxdwVlo%2FjU%2BJ%2BYg5Ix1iU%3D&t=4d5b0474&ps=13740610&shp=a5d48078&shcp=81f88b70&idc=my"
                  className={cx("user-avatar")}
                  alt="abc"
                />
              ) : (
                <button className={cx("more-btn")}>
                  <FontAwesomeIcon icon={faEllipsisVertical} />
                </button>
              )}
            </Menu>
          </div>
        </div>
      </header>
      <AuthModal open={openAuth} onClose={() => setOpenAuth(false)} />
    </>
  );
}
export default Header;
