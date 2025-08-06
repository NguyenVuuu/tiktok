import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./Button.module.scss";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles);
function Button({
  to,
  href,
  onClick,
  className,
  children,
  verysmall,
  small,
  large,
  primary,
  outline,
  basic,
  text,
  rounded,
  disabled,
  leftIcon,
  rightIcon,
  ...passProps
}) {
  let Comp = "button";
  const props = {
    onClick,
    ...passProps,
  };

  //remove event when disabled
  if (disabled) {
    // delete props.onClick;
    Object.keys(props).forEach((key) => {
      if (key.startsWith("on" && typeof [key] === "function")) {
        delete props[key];
      }
    });
  }
  // mặc định là button có onClick
  if (to) {
    props.to = to;
    Comp = Link;
  } else if (href) {
    props.href = href;
    Comp = "a";
  }
  // nếu có to thì là thẻ Link
  // nếu có href thì là thẻ a
  const classes = cx("wrapper", {
    [className]: className,
    verysmall,
    small,
    large,
    primary,
    outline,
    basic,
    text,
    rounded,
    disabled,
  });
  return (
    <>
      <Comp className={classes} {...props}>
        {leftIcon && <span className={cx("icon")}>{leftIcon}</span>}
        <span className={cx("title")}>{children}</span>
        {rightIcon && <span className={cx("icon")}>{rightIcon}</span>}
      </Comp>
    </>
  );
}
Button.propTypes = {
  to: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  verysmall: PropTypes.bool,
  small: PropTypes.bool,
  large: PropTypes.bool,
  primary: PropTypes.bool,
  outline: PropTypes.bool,
  basic: PropTypes.bool,
  text: PropTypes.bool,
  rounded: PropTypes.bool,
  disabled: PropTypes.bool,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
};
export default Button;
