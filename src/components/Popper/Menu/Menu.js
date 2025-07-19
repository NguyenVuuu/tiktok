import PropTypes from "prop-types";
import { useState } from "react";
import Tippy from "@tippyjs/react/headless";
import classNames from "classnames/bind";

import styles from "./Menu.module.scss";
import { Wrapper as PopperWrapper } from "~/components/Popper";
import MenuItem from "./MenuItem";
import Header from "./Header";
const cx = classNames.bind(styles);

const defaultFn = () => {};
function Menu({
  children,
  hideOnClick = false,
  items = [],
  onClick = defaultFn,
}) {
  const [history, setHistory] = useState([{ data: items }]);
  const current = history[history.length - 1];
  // lấy phần tử cuối mảng
  // current là menu hiện tại

  const renderItems = () => {
    return current.data.map((item, index) => {
      //current đang là phần tử cuối mảng -> = {data:items}
      //current.data là lấy được items
      const isParent = !!item.children;

      return (
        <MenuItem
          key={index}
          data={item}
          onClick={() => {
            if (isParent) {
              setHistory((prev) => [...prev, item.children]);
            } else {
              onClick(item);
            }
          }}
        />
      );
    });
  };

  const handleBack = () => {
    setHistory((prev) => prev.slice(0, prev.length - 1));
  };

  const handleResetMenu = () => {
    setHistory((prev) => prev.slice(0, 1));
  };
  return (
    <Tippy
      interactive
      placement="bottom-end"
      delay={[0, 700]}
      offset={[20, 8]}
      hideOnClick={hideOnClick}
      render={(attrs) => (
        <div className={cx("menu-list")} tabIndex="-1" {...attrs}>
          <PopperWrapper className={cx("menu-popper")}>
            {history.length > 1 && (
              <Header
                title={current.title}
                onBack={() => {
                  handleBack();
                }}
              />
            )}
            <div className={cx("menu-body")}>{renderItems()}</div>
          </PopperWrapper>
        </div>
      )}
      onHide={handleResetMenu}
    >
      {children}
    </Tippy>
  );
}

Menu.propTypes = {
  children: PropTypes.node.isRequired,
  hideOnClick: PropTypes.bool,
  items: PropTypes.array,
  onClick: PropTypes.func,
};
export default Menu;
