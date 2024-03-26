import { useEffect, useState } from "react";
import "./TaskForm.css";

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

const TaskForm = (props: any) => {
  const [typeofTask, setTypeOfTask] = useState("");

  const [filesArray, setFiles] = useState([""]);

  const [description, setDescription] = useState("");

  const [minPoints, setMinPoints] = useState(1);
  const [maxPoints, setMaxPoints] = useState(1);

  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(30);

  const [question, setQuestion] = useState("");
  const [answerOnQuestion, setAnswerOnQuestion] = useState("");

  const npcEmail = useInput("", { isEmpty: true, isEmail: false });

  let filesLength = 0;

  function readmultifiles(e: any) {
    let fileList: any = [];
    let lengthofReaded = 0;
    const files = e.currentTarget.files;
    filesLength = files.length;
    Object.keys(files).forEach((i) => {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = (e) => {
        var res = reader.result;
        if (typeof res === "string") {
          fileList.push(res);
          ++lengthofReaded;
        }
        if (lengthofReaded === filesLength) {
          setFiles(fileList);
        }
      };
      reader.readAsDataURL(file);
    });
  }

  return (
    <div className="TaskForm">
      {" "}
      <form id="mainForm"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <h1>Тип задачи:</h1>
        <select
          name="tasktype"
          id="tasktype"
          onChange={(e) => {
            setTypeOfTask(e.target.value);
          }}
        >
          <option value="" selected hidden></option>
          <option value="question">Oтвет на вопрос</option>
          <option value="point">Дохождение до точки в реальном времени</option>
          <option value="npc">Взаимодействие с героем вашего квеста</option>
        </select>
        <h1 hidden={typeofTask !== "question"}>Вопрос:</h1>
        <input
          hidden={typeofTask !== "question"}
          type="text"
          name="questionVal"
          id="questionVal"
          value={question}
          onChange={(e) => {
            setQuestion(e.target.value);
          }}
        />
        <h1 hidden={typeofTask !== "question"}>Правильный ответ на вопрос:</h1>
        <input
          hidden={typeofTask !== "question"}
          type="text"
          name="questionAnswer"
          id="questionAnswer"
          value={answerOnQuestion}
          onChange={(e) => {
            setAnswerOnQuestion(e.target.value);
          }}
        />

        <h1 hidden={typeofTask !== "npc"}>
          Введите электронную почту вашего героя:
        </h1>
        <input
          hidden={typeofTask !== "npc"}
          type="email"
          name="npmcEmail"
          id="npmcEmail"
          value={npcEmail.value}
          onChange={npcEmail.onChange}
          onBlur={npcEmail.onBlur}
        />
        <h1 hidden={typeofTask === ""}>Описание задачи:</h1>
        <textarea
          hidden={typeofTask === ""}
          name="descr"
          id="descr"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></textarea>
        <h1 hidden={typeofTask === ""}>Минимальное кол-во баллов:</h1>
        <input
          hidden={typeofTask === ""}
          type="number"
          name="minpoints"
          id="minpoints"
          value={minPoints}
          min={1}
          onChange={(e) => {
            if (Number(e.target.value) > maxPoints) {
              setMaxPoints(Number(e.target.value));
            }
            setMinPoints(Number(e.target.value));
          }}
        />
        <h1 hidden={typeofTask === ""}>Максимальное кол-во баллов:</h1>
        <input
          hidden={typeofTask === ""}
          type="number"
          name="maxpoints"
          id="maxpoints"
          value={maxPoints}
          min={1}
          onChange={(e) => {
            if (Number(e.target.value) < minPoints) {
              setMinPoints(Number(e.target.value));
            }
            setMaxPoints(Number(e.target.value));
          }}
        />
        <h1 hidden={typeofTask === ""}>Время на выполнение:</h1>
        <input
          hidden={typeofTask === ""}
          type="number"
          name="minutes"
          id="minutes"
          min={0}
          value={minutes}
          onChange={(e) => {
            setMinutes(Number(e.target.value));
            if (Number(e.target.value) === 0) {
              setSeconds(30);
            }
          }}
        />
        <span hidden={typeofTask === ""}>:</span>
        <input
          hidden={typeofTask === ""}
          type="number"
          name="second"
          id="seconds"
          max={60}
          min={0}
          value={seconds}
          onChange={(e) => {
            setSeconds(Number(e.target.value));
          }}
        />
        <h1 hidden={typeofTask === ""}>Добавьте файлы, если это необходимо:</h1>
        <label htmlFor="files" hidden={typeofTask === ""}>
          <img src={`${process.env.PUBLIC_URL}/img/document.svg`} alt="" />
        </label>
        <input
          hidden
          type="file"
          name="files"
          id="files"
          multiple
          onChange={(e) => {
            readmultifiles(e);
          }}
        />
        {filesArray.length > 0 && filesArray[0] !== "" ? (
          <p>Загруженно файлов: {filesArray.length}</p>
        ) : (
          <div></div>
        )}
      </form>
      <p id="emailError" hidden={!npcEmail.emailError || typeofTask !== "npc"}>Указана некорректная почта!</p>
      <input hidden={typeofTask === ""} disabled={npcEmail.emailError} id="CreationTaskButton" type="submit" form="mainForm" value="Продолжить" />
    </div>
  );
};

export default TaskForm;
