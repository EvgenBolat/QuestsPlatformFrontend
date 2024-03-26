import { useEffect, useState } from "react";
import "./loginForm.css";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { error } from "console";

const useValtidation = (value: any, validations: any) => {
  const [isEmpty, setEmpty] = useState(true);
  const [emailError, setEmailError] = useState(false);
  const [inputValid, setInputValid] = useState(false);
  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case "isEmpty":
          value ? setEmpty(false) : setEmpty(true);
          break;
        case "isEmail":
          const re =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
          re.test(String(value).toLowerCase())
            ? setEmailError(false)
            : setEmailError(true);
          break;
      }
    }
  }, [value, validations]);

  useEffect(() => {
    if (isEmpty || emailError) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [isEmpty, emailError]);

  return {
    isEmpty,
    emailError,
    inputValid,
  };
};

const useInput = (initialValue: any, validation: any) => {
  const [value, setValue] = useState(initialValue);

  const [isDirty, setDirty] = useState(false);
  const valid = useValtidation(value, validation);
  const onChange = (e: any) => {
    setValue(e.target.value);
  };

  const onBlur = (e: any) => {
    setDirty(true);
  };

  return {
    value,
    onChange,
    onBlur,
    isDirty,
    ...valid,
  };
};

const LoginForm = (props: any) => {
  const email = useInput("", { isEmpty: true, isEmail: false });
  const password = useInput("", { isEmpty: true });
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="login">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // const response = fetch("httts://fddf/data", {
          //   method: "POST",
          //   body: JSON.stringify({ email: email, password: password }),
          // })
          //   .then((response) => response.json())
          //   .catch((error) => console.log(error));
          // setAuth(true);
          // localStorage.setItem("auth", JSON.stringify(true));
          // localStorage.setToken("token", JSON.stringify(response));
          localStorage.setItem("auth", "true")
          navigate("/user/3");
        }}
        className="main__form"
      >
        <h1 className="form__title">Авторизация</h1>
        <input
          value={email.value}
          onChange={(e) => email.onChange(e)}
          onBlur={(e) => email.onBlur(e)}
          type="email"
          name="email"
          id="email"
          placeholder="Адрес корпоративной почты"
        />{" "}
        <br />
        <input
          value={password.value}
          onChange={(e) => password.onChange(e)}
          onBlur={(e) => password.onBlur(e)}
          type="password"
          name="pass"
          id="pass"
          placeholder="Пароль"
        />{" "}
        <br />
        {email.isDirty &&
          password.isDirty &&
          (email.isEmpty || email.emailError || password.isEmpty) && (
            <div className="wrong_data">Некорректные данные</div>
          )}
        <input
          disabled={!email.inputValid || !password.inputValid}
          type="submit"
          value="Войти"
        />
      </form>
    </div>
  );
};

export default LoginForm;
