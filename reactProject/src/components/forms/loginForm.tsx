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
  const [isValid, setValid] = useState(true);
  const email = useInput("", { isEmpty: true, isEmail: false });
  const password = useInput("", { isEmpty: true });
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const [o, setO] = useState(Math.floor(Math.random() * 100000000).toString());
  const [id, setID] = useState("");
  const [isPrivacyComfirmed, setPrivacyComfird] = useState("");

  //http://localhost:3000/policy

  return (
    <div>
      <img id="loginLogo" src={`${process.env.PUBLIC_URL}/img/mainLogo.svg`} alt="" />
      <div id="loginFormCase">
        <div className="login">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setO(Math.floor(Math.random() * 100000000).toString());
              const formData = new FormData();
              formData.append("email", email.value);
              formData.append("password", password.value);
              formData.append(
                "service_id",
                "ebc9eafe-cb45-11ee-8c0c-00f5f80cf8ae"
              );
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
              if (response.err) {
                setValid(false);
                return;
              } else {
                const body = JSON.stringify({
                  session_hash: response.data.session,
                });
                const data2 = await fetch(
                  "https://quests.projectswhynot.site/api/v1/user/validate",
                  {
                    method: "POST",
                    body: body,
                  }
                )
                  .then((responce) => responce.json())
                  .then((response) => response)
                  .catch((error) => console.log(error));
                if (data2.status === "OK") {
                  localStorage.setItem("auth", "true");
                  localStorage.setItem("id", data2.message.auth_token);
                  let questIdParticipation = localStorage.getItem(
                    "questIdParticipation"
                  );
                  let taskIdParticipation = localStorage.getItem(
                    "taskIdParticipation"
                  );
                  if (
                    questIdParticipation !== null &&
                    taskIdParticipation !== null
                  ) {
                    console.log("npc");
                    navigate(
                      `/setnpc/${questIdParticipation}/${taskIdParticipation}`
                    );
                  } else if (questIdParticipation !== null) {
                    console.log("страница присоединения обычного участника");
                    navigate(`/quest/${questIdParticipation}`);
                  } else {
                    console.log("не пошло на страницу присоединения");
                    navigate(`/user/${data2.message.auth_token}`);
                  }
                } else {
                  console.log("error");
                }
              }
            }}
            className="main__form"
          >
            <h1 className="form__title">Авторизация</h1>
            <img
              id="hseLogo"
              src={`${process.env.PUBLIC_URL}/img/hseLogo.svg`}
              alt=""
            />
            <input
              value={email.value}
              onChange={(e) => {
                email.onChange(e);
                setValid(true);
              }}
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
              onChange={(e) => {
                password.onChange(e);
                setValid(true);
              }}
              onBlur={(e) => password.onBlur(e)}
              type="password"
              name="pass"
              id="pass"
              placeholder="Пароль"
            />{" "}
            <br />
            <div id="ConfidenceBox">
              <input
                type="checkbox"
                name=""
                id=""
                onChange={(e) => {
                  setPrivacyComfird(e.target.value === "1" ? "0" : "1");
                }}
                value={isPrivacyComfirmed}
              />
              <a href="http://localhost:3000/policy">
                Я разделяю политику конфиденциальности "UniQuest" и даю согласие
                на обработку персональных данных
              </a>
            </div>
            {email.isDirty &&
              password.isDirty &&
              (email.isEmpty ||
                email.emailError ||
                password.isEmpty ||
                !isValid) && (
                <div className="wrong_data">Некорректные данные</div>
              )}
            <input
              disabled={
                !email.inputValid ||
                !password.inputValid ||
                isPrivacyComfirmed !== "1"
              }
              type="submit"
              value="Войти"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
