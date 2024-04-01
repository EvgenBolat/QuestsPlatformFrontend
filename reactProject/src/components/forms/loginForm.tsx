import { useEffect, useState } from "react";
import "./loginForm.css";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

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
          if (re) {
            if (String(value).toLowerCase().split("@")[1] !== "edu.hse.ru") {
              setEmailError(true);
            } else {
              setEmailError(false);
            }
          }
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
  const [o, setO] = useState(Math.floor(Math.random() * 100000000).toString());
  const [id, setID] = useState("");

  return (
    <div className="login">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setO(Math.floor(Math.random() * 100000000).toString());
          const formData = new FormData();
          formData.append("email", email.value);
          formData.append("password", password.value);
          formData.append("service_id", "1231238648723648923");
          formData.append("nonce", o);
          const response = await fetch(
            "https://hse.projectswhynot.site/initiate_auth",
            {
              method: "POST",
              body: formData,
            }
          )
            .then((response) => response.json())
            .catch((error) => {
              console.log("ошибка: " + error);
            });
          console.log(response);
          const body = JSON.stringify({ session_hash: response.data.session })
          console.log(body)
          const data2 = await fetch(
            "http://rayignatov.beget.tech/khan/user/validate",
            {
              method: "POST",
              body: body,
            }
          )
            .then((responce) => responce.json())
            .catch((error) => console.log(error));
            console.log(data2)
          // localStorage.setItem("auth", "true");
          // localStorage.setItem("id", "3");
          // let questIdParticipation = localStorage.getItem(
          //   "questIdParticipation"
          // );
          // let taskIdParticipation = localStorage.getItem("taskIdParticipation");
          // if (
          //   questIdParticipation &&
          //   questIdParticipation !== "" &&
          //   taskIdParticipation &&
          //   taskIdParticipation !== ""
          // ) {
          //   navigate(`/setnpc/${questIdParticipation}/${taskIdParticipation}`);
          // } else if (questIdParticipation && questIdParticipation !== "") {
          //   localStorage.setItem("questIdParticipation", "");
          //   navigate(`/user/3/quest/${questIdParticipation}`);
          // } else {
          //   navigate("/user/3");
          // }
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
        <input id="nonce" name="nonce" hidden />
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
