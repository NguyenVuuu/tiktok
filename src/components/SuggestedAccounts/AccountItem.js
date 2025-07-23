import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react/headless";

import styles from "./SuggestedAccounts.module.scss";
import { Wrapper as PopperWrapper } from "../Popper";
import AccountPreview from "./AccountPreview";
const cx = classNames.bind(styles);

function AccountItem({}) {
  const renderPreview = (props) => {
    return (
      <div tabIndex="-1" {...props}>
        <PopperWrapper>
          <div className={cx("preview")}>
            <AccountPreview />
          </div>
        </PopperWrapper>
      </div>
    );
  };
  return (
    <div>
      <Tippy
        interactive
        hideOnClick={false}
        delay={[700, 0]}
        offset={[-20, 0]}
        render={renderPreview}
        placement="bottom"
      >
        <div className={cx("account-item")}>
          <img
            className={cx("avatar")}
            src="https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/42067ded2f44c998e97df9c9c2c75458~tplv-tiktokx-cropcenter:100:100.jpeg?dr=14579&refresh_token=6929d5b4&x-expires=1751968800&x-signature=ogbnC5LxdwVlo%2FjU%2BJ%2BYg5Ix1iU%3D&t=4d5b0474&ps=13740610&shp=a5d48078&shcp=81f88b70&idc=my"
            alt="asd"
          />
          <div className={cx("item-info")}>
            <p className={cx("nickname")}>
              <strong>NguyenAPro</strong>
              <FontAwesomeIcon className={cx("check")} icon={faCircleCheck} />
            </p>
            <p className={cx("name")}>Nguyen Van A</p>
          </div>
        </div>
      </Tippy>
    </div>
  );
}

export default AccountItem;
