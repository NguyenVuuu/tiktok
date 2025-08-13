import PropTypes from "prop-types";
import classNames from "classnames/bind";

import styles from "./BaseModal.module.scss";
import { XMarkIcon } from "~/components/Icon";
import { useEffect, useState } from "react";

const cx = classNames.bind(styles);

function BaseModal({ title, open, onClose, footer, children }) {
  const [show, setShow] = useState(open);
  const [closing, setClosing] = useState(false);
  useEffect(() => {
    if (open) {
      setShow(true);
      setClosing(false);
    } else if (show) {
      setClosing(true);
      const timer = setTimeout(() => {
        setShow(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [open]);
  if (!show) {
    return null;
  }

  return (
    <div className={cx("overlay")}>
      <div
        className={cx("container", { closing })}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={cx("header")}>
          {title && <h2 className={cx("title")}>{title}</h2>}
          <button
            className={cx("close-btn")}
            onClick={onClose}
            aria-label="Close"
          >
            <XMarkIcon className={cx("close-icon")} />
          </button>
        </div>
        <div className={cx("body")}>{children}</div>
        {footer && <div className={cx("footer")}>{footer}</div>}
      </div>
    </div>
  );
}

BaseModal.propTypes = {
  title: PropTypes.string,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  footer: PropTypes.node,
  children: PropTypes.node,
};

export default BaseModal;
