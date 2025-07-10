import classNames from "classnames/bind";
import styles from "./AccountItem.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
function AccountItem() {
  const cx = classNames.bind(styles);
  return (
    <div className={cx("wrapper")}>
      <img
        className={cx("avatar")}
        src="https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/42067ded2f44c998e97df9c9c2c75458~tplv-tiktokx-cropcenter:100:100.jpeg?dr=14579&refresh_token=6929d5b4&x-expires=1751968800&x-signature=ogbnC5LxdwVlo%2FjU%2BJ%2BYg5Ix1iU%3D&t=4d5b0474&ps=13740610&shp=a5d48078&shcp=81f88b70&idc=my"
        alt="aas"
      />
      <div className={cx("info")}>
        <h4 className={cx("name")}>
          <span>asdasd</span>
          <FontAwesomeIcon className={cx("check")} icon={faCheckCircle} />
        </h4>
        <span className={cx("username")}>asdasd</span>
      </div>
    </div>
  );
}

export default AccountItem;
