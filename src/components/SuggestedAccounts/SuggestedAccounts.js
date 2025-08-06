import PropTypes from "prop-types";
import classNames from "classnames/bind";

import styles from "./SuggestedAccounts.module.scss";
import AccountItem from "./AccountItem";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles);

function SuggestedAccounts({ label, data = [] }) {
  return (
    <div className={cx("wrapper")}>
      <p className={cx("label")}>{label}</p>
      {data.map((account) => {
        return (
          <Link key={account.id} to={`/@${account.nickname}`}>
            <AccountItem data={account} />
          </Link>
        );
      })}

      {/* <p className={cx("more-btn")}>See all</p> */}
    </div>
  );
}

SuggestedAccounts.propTypes = {
  label: PropTypes.string.isRequired,
  data: PropTypes.array,
};
export default SuggestedAccounts;
