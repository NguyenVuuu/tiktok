import { forwardRef, useState } from "react";
import classNames from "classnames";
import styles from "./Image.module.scss";

import noImage from "~/assests/images/no-image.png";

function Image({ src, className, ...props }, ref) {
  const [fallback, setFallback] = useState("");

  const handleError = () => {
    setFallback(noImage);
  };
  return (
    <img
      className={classNames(styles.wrapper, className)}
      ref={ref}
      src={fallback || src}
      {...props}
      onError={handleError}
    />
  );
}

export default forwardRef(Image);
