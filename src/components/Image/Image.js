import PropTypes from "prop-types";
import { forwardRef, useState } from "react";
import classNames from "classnames";
import styles from "./Image.module.scss";

import noImage from "~/assests/images/no-image.png";

function Image({ src, className, alt, ...props }, ref) {
  const [fallback, setFallback] = useState("");

  const handleError = () => {
    setFallback(noImage);
  };
  return (
    <img
      className={classNames(styles.wrapper, className)}
      ref={ref}
      src={fallback || src}
      alt={alt}
      {...props}
      onError={handleError}
    />
  );
}

Image.propTypes = {
  src: PropTypes.string,
  className: PropTypes.string,
  alt: PropTypes.string,
};
export default forwardRef(Image);
