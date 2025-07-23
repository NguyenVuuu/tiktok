import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

import styles from "./AccountPreview.module.scss";
import Button from "~/components/Button";
const cx = classNames.bind(styles);

function AccountPreview() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <img
          className={cx("avatar")}
          src="https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/42067ded2f44c998e97df9c9c2c75458~tplv-tiktokx-cropcenter:100:100.jpeg?dr=14579&refresh_token=6929d5b4&x-expires=1751968800&x-signature=ogbnC5LxdwVlo%2FjU%2BJ%2BYg5Ix1iU%3D&t=4d5b0474&ps=13740610&shp=a5d48078&shcp=81f88b70&idc=my"
          alt="asd"
        />
        <div className="">
          <Button className={cx("follow-btn")} primary>
            Follow
          </Button>
        </div>
      </div>
      <div className={cx("body")}>
        <p className={cx("nickname")}>
          <strong>van a pro</strong>
          <FontAwesomeIcon className={cx("check")} icon={faCircleCheck} />
        </p>
        <p className={cx("name")}>nguyen van a</p>
        <p className={cx("analytics")}>
          <strong className={cx("value")}>8.2M </strong>
          <span className={cx("label")}>Followers</span>
          <strong className={cx("value")}>4.2M </strong>
          <span className={cx("label")}>Likes</span>
        </p>
      </div>
    </div>
  );
}

export default AccountPreview;
