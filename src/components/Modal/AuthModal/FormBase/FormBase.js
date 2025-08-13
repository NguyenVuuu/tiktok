import classNames from "classnames/bind";
import styles from "./FormBase.module.scss";

const cx = classNames.bind(styles);

function FormBase({ children, className }) {
  const base = cx("formBase");
  return (
    <div className={`${base} ${className ? `${className}` : ""}`}>
      {children}
    </div>
  );
}
export default FormBase;
