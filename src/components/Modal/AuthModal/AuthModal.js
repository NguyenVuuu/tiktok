import { useState } from "react";
import BaseModal from "~/components/Modal/BaseModal";

import {
  AppleIcon,
  FacebookIcon,
  GoogleIcon,
  KakaoIcon,
  LineIcon,
  QRIcon,
  UserIcon,
} from "~/components/Icon";
import classNames from "classnames/bind";
import styles from "./AuthModal.module.scss";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";

const cx = classNames.bind(styles);

function AuthModal({ open, onClose, defaultTab = "login" }) {
  const [tab, setTab] = useState(defaultTab);
  const [step, setStep] = useState("choose");

  const toggle = () => {
    if (tab === "login") {
      setTab("signup");
      setStep("choose");
    } else {
      setTab("login");
      setStep("choose");
    }
  };
  const options = [
    {
      id: 1,
      icon: <QRIcon />,
      title: "Use QR code",
      showIn: ["login"],
    },
    {
      id: 2,
      icon: <UserIcon />,
      title: "Use phone / email / username",
      showIn: ["login"],
    },
    {
      id: 3,
      icon: <UserIcon />,
      title: "Use phone / email ",
      showIn: ["signup"],
    },
    {
      id: 4,
      icon: <FacebookIcon />,
      title: "Continue with Facebook",
      showIn: ["login", "signup"],
    },
    {
      id: 5,
      icon: <GoogleIcon />,
      title: "Continue with Google",
      showIn: ["login", "signup"],
    },
    {
      id: 6,
      icon: <LineIcon />,
      title: "Continue with Line",
      showIn: ["login", "signup"],
    },
    {
      id: 7,
      icon: <KakaoIcon />,
      title: "Continue with KakaoTalk",
      showIn: ["login", "signup"],
    },
    {
      id: 8,
      icon: <AppleIcon />,
      title: "Continue with Apple",
      showIn: ["login"],
    },
  ];

  const renderBody = () => {
    if (step === "choose") {
      return (
        <div className={cx("wrapper")}>
          {options.map((option) => {
            if (option.showIn.includes(tab)) {
              return (
                <div
                  className={cx("container")}
                  key={option.id}
                  onClick={() => {
                    if (option.id === 2 && tab === "login") {
                      setStep("login-form");
                    } else if (option.id === 3 && tab === "signup") {
                      setStep("signup-form");
                    }
                  }}
                >
                  <div className={cx("icon")}>{option.icon}</div>
                  <div className={cx("text")}>{option.title}</div>
                </div>
              );
            }
            return null;
          })}
        </div>
      );
    } else if (step === "login-form") {
      return <LoginModal />;
    } else if (step === "signup-form") {
      return <SignupModal />;
    }
  };

  const footer = (
    <div>
      <span>
        {tab === "login"
          ? "Dont't have an account? "
          : "Already have an account? "}
      </span>
      <span role="button" className={cx("change-tab")} onClick={toggle}>
        {tab === "login" ? "Sign up" : "Log in"}
      </span>
    </div>
  );
  const handleCloseModal = () => {
    onClose();
    setTab("login");
    setStep("choose");
  };
  return (
    <BaseModal
      title={tab === "login" ? "Log in to Tiktok" : "Sign up for Tiktok"}
      open={open}
      onClose={handleCloseModal}
      footer={footer}
    >
      <div>{renderBody()}</div>
    </BaseModal>
  );
}

export default AuthModal;
