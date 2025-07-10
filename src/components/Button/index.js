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
  small,
  large,
  primary,
  outline,
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
    small,
    large,
    primary,
    outline,
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

export default Button;
