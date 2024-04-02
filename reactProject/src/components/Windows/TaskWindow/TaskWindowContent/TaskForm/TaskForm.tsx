import { useEffect, useState } from "react";
import "./TaskForm.css";
import { useParams } from "react-router-dom";

const useValtidation = (value: any, validations: any) => {
  const [isEmpty, setEmpty] = useState(true);
  const [inputValid, setInputValid] = useState(false);
  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case "isEmpty":
          value ? setEmpty(false) : setEmpty(true);
          break;
      }
    }
  }, [value, validations]);

  useEffect(() => {
    if (isEmpty) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [isEmpty]);

  return {
    isEmpty,
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
  const [typeofTask, setTypeOfTask] = useState(props.task.task_type.toString());

  const [filesArray, setFiles] = useState([""]);

  const [description, setDescription] = useState(props.task.description);

  const [minPoints, setMinPoints] = useState(props.task.min_points);
  const [maxPoints, setMaxPoints] = useState(props.task.max_points);

  const [minutes, setMinutes] = useState(Math.floor(props.task.task_time / 60));
  const [seconds, setSeconds] = useState(
    Number(props.task.task_time - 60 * Math.floor(props.task.task_time / 60))
  );

  const [question, setQuestion] = useState(props.task.question);
  const [answerOnQuestion, setAnswerOnQuestion] = useState(props.task.answer);

  const { userid } = useParams();

  useEffect(() => {
    setTypeOfTask(props.task.task_type.toString());

    setDescription(props.task.description);

    setMinPoints(props.task.min_points);
    setMaxPoints(props.task.max_points);

    setMinutes(
      Math.floor(props.task.task_time / 60)
    );
    setSeconds(
      Number(props.task.task_time - 60 * Math.floor(props.task.task_time / 60))
    );

    setQuestion(props.task.question);
    setAnswerOnQuestion(props.task.answer);
  }, [props.task]);

  const setNewTask = async () => {
    let task = {
      auth_token: userid,
      task_num: props.tasks.length,
      task_type: typeofTask,
      task_time: minutes * 60 + seconds,
      description: description,
      max_points: maxPoints,
      answer: answerOnQuestion,
      question: question,
      min_points: minPoints,
      vital: Number(props.vital),
    };
    console.log(JSON.stringify(task));
    const response = await fetch(
      `https://quests.projectswhynot.site/api/v1/block/${props.currentCard.id}/task`,
      {
        method: "POST",
        body: JSON.stringify(task),
      }
    )
      .then((response) => response.json())
      .catch((error) => console.log(error));
    console.log(response);
    if (response.status === "OK") {
      let newTasksList = props.tasks;
      props.task.task_num = props.tasks.length;
      let newTask = props.task;
      newTask.vital = props.vital;
      newTask.task_id = response.message.task_id;
      if (typeofTask === 2) {
        navigator.clipboard.writeText(
          `http://localhost:3000/setnpc/${questid}/${new_task_id}`
        );
        alert("Ссылка-приглашение для npc скопирована в буфер-обмена!");
      }
      props.setTasks([...props.tasks, task]);
      props.setTaskWindowActive(false);
    }
  };

  useEffect(() => {
    props.task.task_type = typeofTask;
    props.task.files = filesArray;
    props.task.description = description;
    props.task.question = question;
    props.task.answer = answerOnQuestion;
    props.task.min_points = minPoints;
    props.task.max_points = maxPoints;
    props.task.time = minutes * 60 + seconds;
  }, [
    typeofTask,
    filesArray,
    description,
    minPoints,
    maxPoints,
    minutes,
    seconds,
    question,
    answerOnQuestion,
  ]);

  function readmultifiles(e: any) {
    let fileList: any = [];
    const files = e.currentTarget.files;
    Object.keys(files).forEach((i) => {
      const file = files[i];
      fileList.push(file);
      setFiles(fileList);
    });
  }

  const { questid } = useParams();

  const new_task_id = "33234";

  return (
    <div className="TaskForm">
      <form
        id="mainForm"
        onSubmit={(e) => {
          e.preventDefault();
          if (props.typeOfWindow === "simple") {
            console.log("изменение задачи");
            console.log(typeofTask);
          } else {
            setNewTask();
          }
        }}
      >
        <h1>Тип задачи:</h1>
        <select
          name="tasktype"
          id="tasktype"
          onChange={(e) => {
            setTypeOfTask(Number(e.target.value));
          }}
          value={typeofTask}
        >
          <option value="" selected hidden></option>
          <option value="0">Oтвет на вопрос</option>
          <option value="1">Дохождение до точки в реальном времени</option>
          <option value="2">Взаимодействие с героем вашего квеста</option>
        </select>
        <h1 hidden={typeofTask !== 0}>Вопрос:</h1>
        <input
          hidden={typeofTask !== 0}
          type="text"
          name="questionVal"
          id="questionVal"
          value={question}
          onChange={(e) => {
            setQuestion(e.target.value);
          }}
        />
        <h1 hidden={typeofTask !== 0}>Правильный ответ на вопрос:</h1>
        <input
          hidden={typeofTask !== 0}
          type="text"
          name="questionAnswer"
          id="questionAnswer"
          value={answerOnQuestion}
          onChange={(e) => {
            setAnswerOnQuestion(e.target.value);
          }}
        />
        <h1 hidden={typeofTask === -1}>Описание задачи:</h1>
        <textarea
          hidden={typeofTask === -1}
          name="descr"
          id="descr"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></textarea>
        <h1 hidden={typeofTask === -1 || !props.vital}>
          Минимальное кол-во баллов:
        </h1>
        <input
          hidden={typeofTask === -1 || !props.vital}
          type="number"
          name="minpoints"
          id="minpoints"
          value={minPoints}
          min={props.vital ? Number(1) : Number(0)}
          onChange={(e) => {
            if (Number(e.target.value) > maxPoints) {
              setMaxPoints(Number(e.target.value));
            }
            setMinPoints(Number(e.target.value));
          }}
        />
        <h1 hidden={typeofTask === -1}>Максимальное кол-во баллов:</h1>
        <input
          hidden={typeofTask === -1}
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
        <h1 hidden={typeofTask === -1}>Время на выполнение:</h1>
        <input
          hidden={typeofTask === -1}
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
        <span hidden={typeofTask === -1}>:</span>
        <input
          hidden={typeofTask === -1}
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
        <h1 hidden={typeofTask === -1}>Добавьте файлы, если это необходимо:</h1>
        <label htmlFor="files" hidden={typeofTask === -1}>
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
      <button
        hidden={typeofTask !== 1 || props.typeOfWindow !== "simple"}
        disabled={typeofTask !== 1 || props.typeOfWindow !== "simple"}
      >
        Скачать QR-код
      </button>
      <input
        hidden={typeofTask === -1}
        disabled={typeofTask === 0 && question === ""}
        id="CreationTaskButton"
        type="submit"
        form="mainForm"
        value="Продолжить"
      />
    </div>
  );
};

export default TaskForm;
