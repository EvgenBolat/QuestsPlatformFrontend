import { useEffect, useState } from "react";
import "./TaskForm.css";
import { useParams } from "react-router-dom";

var QRCode = require("qrcode-svg");

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
  function convertPng(svg: any, size: any, name: any) {
    let canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    let img = new Image();
    img.width = size;
    img.height = size;
    let a = document.createElement("a");
    a.download = name;
    img.onload = function () {
      canvas.getContext("2d")!.drawImage(img, 0, 0);
      a.href = canvas.toDataURL("image/png");
      a.click();
      img.remove();
      canvas.remove();
      a.remove();
    };
    img.src = "data:image/svg+xml," + encodeURIComponent(svg);
  }

  function generateRandomString(length: any) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  const [typeofTask, setTypeOfTask] = useState(props.task.task_type.toString());

  const [filesArray, setFiles] = useState<File[]>();

  const [description, setDescription] = useState(props.task.description);

  const [minPoints, setMinPoints] = useState(props.task.min_points);
  const [maxPoints, setMaxPoints] = useState(props.task.max_points);

  const [minutes, setMinutes] = useState(Math.floor(props.task.task_time / 60));
  const [seconds, setSeconds] = useState(
    Number(props.task.task_time - 60 * Math.floor(props.task.task_time / 60))
  );

  const [question, setQuestion] = useState(props.task.question);
  const [answerOnQuestion, setAnswerOnQuestion] = useState(props.task.answer);

  const userid = localStorage.getItem("id")

  const changeTask = async () => {
    let task = {
      auth_token: userid,
      task_num: props.task.task_num,
      task_time: minutes * 60 + seconds,
      description: description,
      max_points: maxPoints,
      answer: answerOnQuestion,
      question: question,
      min_points: minPoints,
      vital: Number(props.vital),
    };
    const response = await fetch(
      `https://quests.projectswhynot.site/api/v1/task/${props.deleteId}`,
      {
        method: "PUT",
        body: JSON.stringify(task),
      }
    )
      .then((response) => response.json())
      .catch((error) => console.log(error));
      if(response.status === "OK"){
        let new_tasks = props.tasks
        new_tasks[props.tasks.findIndex( (el: any) => el.id === props.task.id)].vital =  props.vital
      }
  };

  useEffect(() => {
    setTypeOfTask(props.task.task_type.toString());

    setDescription(props.task.description);

    setMinPoints(props.task.min_points);
    setMaxPoints(props.task.max_points);


    setMinutes(Math.floor(props.task.task_time / 60));
    setSeconds(
      Number(props.task.task_time - 60 * Math.floor(props.task.task_time / 60))
    );

    setQuestion(props.task.question);
    setAnswerOnQuestion(props.task.answer);
  }, [props.task]);

  const setNewTask = async () => {
    let formData = new FormData();
    let random = "";
    if (typeofTask === "1" || typeofTask === "2") {
      random = generateRandomString(15);
    }
    if (userid) {
      formData.append("auth_token", userid);
      formData.append("task_type", typeofTask);
      formData.append("task_num", props.tasks.length);
      formData.append("task_time", (minutes * 60 + seconds).toString());
      formData.append("description", description);
      formData.append("max_points", maxPoints.toString());
      if (typeofTask === "0") {
        formData.append("answer", answerOnQuestion);
      } else if (typeofTask === "1" || typeofTask === "2") {
        formData.append("answer", random);
      }
      formData.append("question", question);
      formData.append("min_points", minPoints.toString());
      formData.append("vital", Number(props.vital).toString());
    }
    if (filesArray && filesArray.length > 0) {
      formData.append("files_length", filesArray.length.toString());
      for (let i = 0; i < filesArray.length; i++) {
        formData.append(`file_${i}`, filesArray[i], filesArray[i].name);
      }
    } else {
      formData.append("files_length", "1");
      let url = `${process.env.PUBLIC_URL}/img/defaultImage.png`;
      let file = await fetch(url)
        .then((r) => r.blob())
        .then(
          (blobFile) =>
            new File([blobFile], "defaultImage.png", { type: "image/png" })
        );
      formData.append("file_0", file, file.name);
    }
    const response = await fetch(
      `https://quests.projectswhynot.site/api/v1/block/${props.currentCard.id}/task`,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => response.json())
      .catch((error) => console.log(error));
    if (response.status === "OK") {
      props.task.task_num = props.tasks.length;
      let newTask = props.task;
      newTask.vital = props.vital;
      newTask.id = response.message.task_id;
      props.setTask(newTask)
      props.setDeleteID(response.message.task_id)
      if (typeofTask === "1") {
        convertPng(
          new QRCode({
            content: random,
            padding: 4,
            width: 512,
            height: 512,
            color: "#000000",
            background: "#ffffff",
            ecl: "M",
          }).svg(),
          512,
          "Answer.png"
        );
      }
      if (typeofTask === "2") {
        navigator.clipboard.writeText(
          `https://quests.projectswhynot.site/setnpc/${questid}/${response.message.task_id}` // `http://localhost:3000/setnpc/${questid}/${response.message.task_id}`
        );
        alert("Ссылка-приглашение для npc скопирована в буфер-обмена!");
      }
      props.setTasks([...props.tasks, newTask]);
      let currentCard2 = props.currrentCard
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
    for (let i = 0; i < e.currentTarget.files.length; i++) {
      const file = files[i];
      fileList.push(file);
    }
    setFiles(fileList);
  }

  const { questid } = useParams();

  return (
    <div className="TaskForm">
      <form
        id="mainForm"
        onSubmit={(e) => {
          e.preventDefault();
          if (props.typeOfWindow === "simple") {
            changeTask();
          } else {
            setNewTask();
          }
        }}
      >
        <h1>Тип задачи:</h1>
        <select
          name="tasktype"
          id="tasktype"
          disabled={props.typeOfWindow === "simple"}
          onChange={(e) => {
            setTypeOfTask(e.target.value);
          }}
          value={typeofTask}
        >
          <option value="-1" selected hidden></option>
          <option value="0">Oтвет на вопрос</option>
          <option value="1">Дохождение до точки в реальном времени</option>
          <option value="2">Взаимодействие с героем вашего квеста</option>
        </select>
        <h1 hidden={typeofTask !== "0"}>Вопрос:</h1>
        <textarea
          hidden={typeofTask !== "0"}
          name="questionVal"
          id="questionVal"
          value={question}
          onChange={(e) => {
            setQuestion(e.target.value);
            props.setChanged(true);
          }}
        />
        <h1 hidden={typeofTask !== "0"}>Правильный ответ на вопрос:</h1>
        <input
          hidden={typeofTask !== "0"}
          type="text"
          name="questionAnswer"
          id="questionAnswer"
          value={answerOnQuestion}
          onChange={(e) => {
            setAnswerOnQuestion(e.target.value);
            props.setChanged(true);
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
            props.setChanged(true);
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
            props.setChanged(true);
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
            props.setChanged(true);
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
            props.setChanged(true);
          }}
        />
        <span id="SpaceBetweenTime" hidden={typeofTask === -1}>:</span>
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
            props.setChanged(true);
          }}
        />
        <h1 hidden={typeofTask === -1}>Добавьте файлы, если это необходимо:</h1>
        <label htmlFor="files" hidden={typeofTask === -1}>
          <img id="FilePutImage" src={`${process.env.PUBLIC_URL}/img/document.svg`} alt="" />
        </label>
        <input
          hidden
          type="file"
          name="files"
          id="files"
          multiple
          onChange={(e) => {
            readmultifiles(e);
            props.setChanged(true);
          }}
        />
        {filesArray && filesArray.length > 0 && filesArray[0] ? (
          <p id="filesDonwnloadedText">Загруженно файлов: {filesArray.length}</p>
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
        disabled={
          (typeofTask === "0" && (question === "" || answerOnQuestion === "")) ||
          (props.typeOfWindow === "simple" && !props.isChanged) || typeofTask === "-1"
        }
        id="CreationTaskButton"
        type="submit"
        form="mainForm"
        value="Продолжить"
      />
    </div>
  );
};

export default TaskForm;
