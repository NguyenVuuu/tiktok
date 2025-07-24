import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react/headless";

import styles from "./SuggestedAccounts.module.scss";
import { Wrapper as PopperWrapper } from "../Popper";
import AccountPreview from "./AccountPreview";
import Image from "../Image";
const cx = classNames.bind(styles);

function AccountItem({ data }) {
  const renderPreview = (props) => {
    return (
      <div tabIndex="-1" {...props}>
        <PopperWrapper>
          <div className={cx("preview")}>
            <AccountPreview data={data} />
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
          <Image
            className={cx("avatar")}
            src={data.avatar}
            alt={data.nickname}
          />
          <div className={cx("item-info")}>
            <p className={cx("nickname")}>
              <strong>{data.nickname}</strong>
              {data.tick && (
                <FontAwesomeIcon className={cx("check")} icon={faCircleCheck} />
              )}
            </p>
            <p className={cx("name")}>
              {data.first_name} {data.last_name}
            </p>
          </div>
        </div>
      </Tippy>
    </div>
  );
}
AccountItem.propTypes = {
  data: PropTypes.object.isRequired,
};
export default AccountItem;
