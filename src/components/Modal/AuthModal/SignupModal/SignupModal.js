import { useState } from "react";
import classNames from "classnames/bind";
import Tippy from "@tippyjs/react/headless";

import { Wrapper as PopperWrapper } from "~/components/Popper";
import { AngleDownIcon, HideIcon, UnHideIcon } from "~/components/Icon";
import styles from "./SignupModal.module.scss";
import Button from "~/components/Button";
import FormBase from "../FormBase";
import { register } from "~/service/authService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);
function SignupModal() {
  const [fieldValue, setFieldValue] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [openSelector, setOpenSelector] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  const [errorField, setErrorField] = useState({
    email: "",
    password: "",
  });
  const [resultSubmit, setResultSubmit] = useState({
    success: false,
    message: "",
  });

  const regexMail = /^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9]+@gmail\.com$/;
  const regexPwd = /^.{6,}$/;

  const validMail = regexMail.test(fieldValue.email);
  const validPwd = regexPwd.test(fieldValue.password);

  const isDisabled = !validMail || !validPwd;

  const toggleSelector = (type) => {
    setOpenSelector((prev) => (prev === type ? null : type));
  };

  const closeSelector = () => {
    setOpenSelector(null);
  };

  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const day = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
  ];
  const year = [
    "2024",
    "2023",
    "2022",
    "2021",
    "2020",
    "2019",
    "2018",
    "2017",
    "2016",
    "2015",
    "2014",
    "2013",
    "2012",
    "2011",
    "2010",
    "2009",
    "2008",
    "2007",
    "2006",
    "2005",
    "2004",
    "2003",
    "2002",
    "2001",
    "2000",
    "1999",
    "1998",
    "1997",
    "1996",
    "1995",
    "1994",
    "1993",
    "1992",
    "1991",
    "1990",
    "1989",
    "1988",
    "1987",
    "1986",
    "1985",
    "1984",
    "1983",
    "1982",
    "1981",
    "1980",
    "1979",
    "1978",
    "1977",
    "1976",
    "1975",
    "1974",
    "1973",
    "1972",
    "1971",
    "1970",
    "1969",
    "1968",
    "1967",
    "1966",
    "1965",
    "1964",
    "1963",
    "1962",
    "1961",
    "1960",
    "1959",
    "1958",
    "1957",
    "1956",
    "1955",
    "1954",
    "1953",
    "1952",
    "1951",
    "1950",
  ];

  const validateField = (type, value) => {
    let error = "";
    if (type === "email") {
      if (!regexMail.test(value)) {
        error = "Invalid email";
      }
    }
    if (type === "password") {
      if (!regexPwd.test(value)) {
        error = "Password must be at least 6 characters";
      }
    }
    setErrorField((prev) => ({
      ...prev,
      [type]: error,
    }));
    return error === "";
  };

  const validateForm = () => {
    const emailValid = validateField("email", fieldValue.email);
    const passwordValid = validateField("password", fieldValue.password);
    return emailValid && passwordValid;
  };

  const handleFieldValue = (type, value) => {
    setFieldValue((prev) => ({
      ...prev,
      [type]: value,
    }));

    //reset text submit khi user nhap lai

    setResultSubmit({
      success: false,
      message: "",
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!validateForm()) {
        return;
      }
      setLoading(true);
      let response = await register(fieldValue.email, fieldValue.password);
      if (response.success) {
        //reset form
        setFieldValue({
          email: "",
          password: "",
        });
        setSelectedDay(null);
        setSelectedMonth(null);
        setSelectedYear(null);

        //show mess success
        setResultSubmit({
          success: true,
          message: "Register successfully, Go to login",
        });
      } else {
        setResultSubmit({
          success: false,
          message: response.error || response.message || "Register Fail",
        });
      }
    } catch (error) {
      setResultSubmit({
        success: false,
        message: error.message || "Something went wrong",
      });
      console.log("Please double check the information!", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <FormBase className={cx("signup-form")}>
      <form>
        <div className={cx("label")}>When's your birthday?</div>
        <div className={cx("age-selectors")}>
          <div className={cx("selector-container")}>
            <Tippy
              interactive
              placement="bottom-start"
              visible={openSelector === "month"}
              onClickOutside={closeSelector}
              render={(attrs) => (
                <div tabIndex="-1" {...attrs}>
                  <PopperWrapper className={cx("selector-popper")}>
                    <div className={cx("options")}>
                      {month.map((m) => (
                        <div
                          key={m}
                          className={cx("option")}
                          onClick={() => {
                            setSelectedMonth(m);
                            closeSelector();
                          }}
                        >
                          {m}
                        </div>
                      ))}
                    </div>
                  </PopperWrapper>
                </div>
              )}
            >
              <div
                className={cx("selector")}
                onClick={() => toggleSelector("month")}
              >
                <div
                  className={cx("select-label", { selected: selectedMonth })}
                >
                  {selectedMonth || "Month"}
                  <AngleDownIcon
                    className={cx("down-icon", {
                      rotate: openSelector === "month",
                    })}
                  />
                </div>
              </div>
            </Tippy>
          </div>

          <div className={cx("selector-container")}>
            <Tippy
              interactive
              placement="bottom-start"
              visible={openSelector === "day"}
              onClickOutside={closeSelector}
              render={(attrs) => (
                <div tabIndex="-1" {...attrs}>
                  <PopperWrapper className={cx("selector-popper")}>
                    <div className={cx("options")}>
                      {day.map((d) => (
                        <div
                          key={d}
                          className={cx("option")}
                          onClick={() => {
                            setSelectedDay(d);
                            closeSelector();
                          }}
                        >
                          {d}
                        </div>
                      ))}
                    </div>
                  </PopperWrapper>
                </div>
              )}
            >
              <div
                className={cx("selector")}
                onClick={() => toggleSelector("day")}
              >
                <div className={cx("select-label", { selected: selectedDay })}>
                  {selectedDay || "Day"}
                  <AngleDownIcon
                    className={cx("down-icon", {
                      rotate: openSelector === "day",
                    })}
                  />
                </div>
              </div>
            </Tippy>
          </div>

          <div className={cx("selector-container")}>
            <Tippy
              interactive
              placement="bottom-start"
              visible={openSelector === "year"}
              onClickOutside={closeSelector}
              render={(attrs) => (
                <div tabIndex="-1" {...attrs}>
                  <PopperWrapper className={cx("selector-popper")}>
                    <div className={cx("options")}>
                      {year.map((y) => (
                        <div
                          key={y}
                          className={cx("option")}
                          onClick={() => {
                            setSelectedYear(y);
                            closeSelector();
                          }}
                        >
                          {y}
                        </div>
                      ))}
                    </div>
                  </PopperWrapper>
                </div>
              )}
            >
              <div
                className={cx("selector")}
                onClick={() => toggleSelector("year")}
              >
                <div className={cx("select-label", { selected: selectedYear })}>
                  {selectedYear || "Year"}
                  <AngleDownIcon
                    className={cx("down-icon", {
                      rotate: openSelector === "year",
                    })}
                  />
                </div>
              </div>
            </Tippy>
          </div>
        </div>
        <div className={cx("description")}>
          Your birthday won't be shown publicly.
        </div>
        <div className={cx("label")}>Email</div>
        <div className={cx("container")}>
          <div className={cx("input-container")}>
            <input
              placeholder="Email address"
              type="text"
              onChange={(e) => handleFieldValue("email", e.target.value)}
              onBlur={(e) => validateField("email", e.target.value)}
              value={fieldValue.email}
            />
            <div className={cx("icon-container")}></div>
          </div>
          <div className={cx("error")}>{errorField.email}</div>
        </div>
        <div className={cx("container")}>
          <div className={cx("input-container")}>
            <input
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              onChange={(e) => handleFieldValue("password", e.target.value)}
              onBlur={(e) => validateField("password", e.target.value)}
              value={fieldValue.password}
            />
            <div
              className={cx("icon-container")}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <i>{showPassword ? <UnHideIcon /> : <HideIcon />}</i>
            </div>
          </div>
          <div className={cx("error")}>{errorField.password}</div>
        </div>
      </form>

      <Button
        large
        primary={!isDisabled}
        disabled={isDisabled}
        className={cx("next-btn")}
        onClick={handleSubmit}
      >
        {loading ? (
          <FontAwesomeIcon icon={faCircleNotch} className={cx("loading")} />
        ) : (
          "Next"
        )}
      </Button>
      {resultSubmit.message !== "" && (
        <div
          className={cx("result-message", {
            success: resultSubmit.success,
            error: !resultSubmit.success,
          })}
        >
          {resultSubmit.message}
        </div>
      )}
    </FormBase>
  );
}

export default SignupModal;
