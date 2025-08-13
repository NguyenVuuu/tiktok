import { useState } from "react";
import classNames from "classnames/bind";

import styles from "./LoginModal.module.scss";
import { HideIcon, UnHideIcon } from "~/components/Icon";
import Button from "~/components/Button";
import FormBase from "../FormBase";

const cx = classNames.bind(styles);

function LoginModal() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const isDisabled = !username || !password;
  return (
    <FormBase className={cx("login-form")}>
      <div className={cx("label")}>Email or username</div>
      <form>
        <div className={cx("username")}>
          <input
            placeholder="Email or username"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={cx("password")}>
          <div className={cx("input-password")}>
            <input
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className={cx("hide-btn")}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <i>
                {showPassword ? (
                  <UnHideIcon className={cx("hide-icon")} />
                ) : (
                  <HideIcon className={cx("hide-icon")} />
                )}
              </i>
            </div>
          </div>
        </div>
      </form>

      <Button
        large
        primary={!isDisabled}
        disabled={isDisabled}
        className={cx("login-btn")}
      >
        Log in
      </Button>
    </FormBase>
  );
}

export default LoginModal;
