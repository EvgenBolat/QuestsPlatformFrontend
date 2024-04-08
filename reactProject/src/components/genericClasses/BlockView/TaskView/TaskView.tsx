import { useEffect, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

import "./taskView.css";
const TaskView = (props: any) => {
  const [isQrCodeScanningEnabled, setQrCodeScanningEnabled] = useState(false);
  const [asnwer, setAnswer] = useState("");
  const [isAnswerButtonClicked, setAnswerButtonClicked] = useState(false);
  const [lastedSecond, setLastedSecond] = useState(0);

  const CountDown = (minutes = 0, seconds = 0, pausedNow = true) => {
    const [[m, s], setTime] = useState([minutes, seconds]);
    const [isTaskPassed, setTaskPassed] = useState(false);
    const tick = () => {
      if (pausedNow) {
        return;
      }
      if (
        !props.viewMode ||
        (props.block_type && props.data.user_progress.status === 1)
      ) {
        if (s === 0) {
          setTime([m - 1, 59]);
          pausedNow = true;
          setLastedSecond(lastedSecond + 1);
          localStorage.setItem("lastedSecond", (lastedSecond + 1).toString());
        } else {
          setTime([m, s - 1]);
          setLastedSecond(lastedSecond + 1);
        }
      }
    };

    useEffect(() => {
      setTime([minutes, seconds]);
    }, [minutes, seconds]);

    useEffect(() => {
      if (m < 0) {
        setTime([m * -1, s]);
      }
      if (s < 0) {
        setTime([m, s * -1]);
      }
      if (m === 0 && s === 0) {
        let points = 0;
        if (!props.viewMode) {
          props.setAnyTaskNoCompleted(true);
        }
        if (props.data.vital) {
          points = 10 * props.data.min_points;
        }
        if (!props.viewMode) {
          props.changeTaskStatus(props.data.id, 2, points);
          setTaskPassed(true);
        }
        let questData = props.questData;
        if (props.viewMode) {
          questData.tasks_list[props.data.task_num].user_progress.status = 2;
        } else {
          questData[props.block_num].tasks_list[
            props.data.task_num
          ].user_progress.status = 2;
        }
        props.setQuestData([...questData]);
        setLastedSecond(0);
        return;
      }
    }, [m, s]);

    useEffect(() => {
      const timerID = setInterval(() => tick(), 1000);
      return () => clearInterval(timerID);
    });
    return (
      <div>
        {`${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`}
      </div>
    );
  };

  function triggerDownload() {
    var element = document.createElement("a");
    element.style.display = "none";
    let files = props.data.images.split(" ");
    for (let i = 0; i < files.length - 1; i++) {
      element.setAttribute(
        "href",
        `https://quests.projectswhynot.site/api/v1/static/${files[i]}`
      );
      element.setAttribute("download", files[i].split("/").pop());
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  }

  useEffect(() => {
    const config = { fps: 10, qrbox: { width: 200, height: 200 } };
    let html5QrCode = new Html5Qrcode("simple");

    const qrScannerStop = () => {
      if (html5QrCode.isScanning) {
        html5QrCode
          .stop()
          .then(() => {
            console.log("Scaner stop");
          })
          .catch(() => {
            console.log("Scanner error");
          });
      }
    };

    const qrCodeSucess = (decodedText: any) => {
      setAnswer(decodedText);
      setQrCodeScanningEnabled(false);
    };

    if (isQrCodeScanningEnabled) {
      html5QrCode = new Html5Qrcode("qrCodeContainer");
      if (isQrCodeScanningEnabled) {
        html5QrCode.start(
          { facingMode: "environment" },
          config,
          qrCodeSucess,
          () => {}
        );
      } else {
        qrScannerStop();
      }
    }

    return () => {
      qrScannerStop();
    };
  }, [isQrCodeScanningEnabled]);

  return (
    <div className="TaskView">
      <h1 id="taskName">Задача № {props.data.task_num + 1}</h1>
      <div hidden={props.data.user_progress.status === 2}>
        <h1 id="descrHeader">Описание к задаче:</h1>
        <textarea
          readOnly
          name=""
          className="textAreasTask"
          value={props.data.description}
        ></textarea>
        <form
          id="taskform"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <p className="taskAction" hidden={props.data.task_type !== 0}>
            Ответьте правильно на вопрос!
          </p>
          <textarea
            className="textAreasTask"
            readOnly
            hidden={
              props.data.task_type !== 0 ||
              (props.block_type && props.data.user_progress.status === 0)
            }
            name=""
            value={props.data.question}
          ></textarea>
          <p
            hidden={
              props.data.task_type !== 0 ||
              (props.block_type && props.data.user_progress.status === 0)
            }
          >
            Ваш ответ:
          </p>
          <input
            hidden={
              props.data.task_type !== 0 ||
              (props.block_type && props.data.user_progress.status === 0)
            }
            type="text"
            name=""
            id="asnwerInput"
            value={asnwer}
            onChange={(e) => {
              setAnswer(e.target.value);
              setAnswerButtonClicked(false);
            }}
          />
          <p className="taskAction" hidden={props.data.task_type !== 1}>
            Найдите нужную точку и отсканируйте QR-код!
          </p>
          <p className="taskAction" hidden={props.data.task_type !== 2}>
            Найдите нужного героя и отсканируйте QR-код!
          </p>
          {isQrCodeScanningEnabled ? (
            <div id="simple">
              <div className="scanner">
                <div id="qrCodeContainer"></div>
                <h1
                  className="cameraOff"
                  onClick={() => setQrCodeScanningEnabled(false)}
                >
                  Выключить камеру
                </h1>
              </div>
            </div>
          ) : (
            <div id="simple"> </div>
          )}

          <img
            hidden={
              props.data.task_type === 0 ||
              (props.block_type && props.data.user_progress.status === 0)
            }
            className="startButton"
            draggable={false}
            src={`${process.env.PUBLIC_URL}/img/camera.svg`}
            alt="im"
            onClick={() => {
              if (!props.viewMode) {
                setQrCodeScanningEnabled(true);
              }
            }}
          />
          <p
            hidden={
              props.data.task_type === 0 ||
              (props.block_type && props.data.user_progress.status === 0)
            }
            id="openCameraText"
          >
            Открыть камеру
          </p>
        </form>
        <p
          hidden={
            props.data.images === "defaultImage.png" ||
            (props.block_type && props.data.user_progress.status === 0)
          }
          id="filesHeaderText"
        >
          Приложенные файлы:
        </p>
        <img
          hidden={
            props.data.images === "defaultImage.png" ||
            (props.block_type && props.data.user_progress.status === 0)
          }
          id="filesDownloadButton"
          onClick={(e) => {
            triggerDownload();
          }}
          src={`${process.env.PUBLIC_URL}/img/document.svg`}
          alt=""
        />
        <h1 id="attentionHeaderText" hidden={!props.data.vital}>
          Внимание!
        </h1>
        <p className="simpleTaskText attentionDescr" hidden={!props.data.vital}>
          Данная Задача является обязательной
        </p>
        <p
          hidden={props.block_type && props.data.user_progress.status === 0}
          className="simpleTaskText"
        >
          У вас осталось:
        </p>
        <h1
          hidden={
            props.block_type === 0 && props.data.user_progress.status === 0
          }
          id="taskTime"
        >
          {CountDown(
            Math.floor(props.data.task_time / 60),
            Math.floor(props.data.task_time % 60),
            props.data.user_progress.status !== 1
          )}
        </h1>
        <p hidden={props.data.vital} className="simpleTaskText maxPoints">
          Макс. балл : <b>{props.data.max_points} </b>
        </p>
        <p className="simpleTaskText" hidden={!props.data.vital}>
          При выполнении задания позднее{" "}
          {props.block_type && props.data.user_progress.status === 0
            ? "указанного времени"
            : ""}{" "}
          вы получите лишь:
        </p>
        <h1 className="simpleTaskText points" hidden={!props.data.vital}>
          {props.data.min_points} / {props.data.max_points}
        </h1>
        <p className="simpleTaskText" hidden={!props.data.vital}>
          баллов
        </p>
        <p
          hidden={
            asnwer === "" ||
            asnwer === props.data.answer ||
            !isAnswerButtonClicked
          }
          className="simpleTaskText wrongAnswer"
        >
          Неправильный ответ!
        </p>
        <input
          id="sendAnswer"
          type="submit"
          value={
            props.block_type && props.data.user_progress.status === 0
              ? "Принять задание"
              : "Ответить"
          }
          form="taskform"
          onClick={(e) => {
            e.preventDefault();
            if (props.data.user_progress.status === 0) {
              let blocks = props.questData;
              for (let i = 0; i < blocks.length; i++) {
                if (blocks[i].id === props.blockId) {
                  for (let j = 0; j < blocks[i].tasks_list.length; j++) {
                    if (blocks[i].tasks_list[j].id === props.data.id) {
                      blocks[i].tasks_list[j].user_progress.status = 1;
                      if (!props.viewMode) {
                        props.changeTaskStatus(props.data.id, 1, 0);
                      }
                      props.setData([...blocks]);
                      break;
                    }
                  }
                  break;
                }
              }
            } else if (props.data.user_progress.status === 1) {
              setAnswerButtonClicked(true);
              if (props.viewMode === false) {
                if (asnwer === props.data.answer) {
                  let questData = props.questData;
                  questData[props.block_num].tasks_list[
                    props.data.task_num
                  ].user_progress.status = 2;
                  props.setQuestData([...questData]);
                  let points = 0;
                  if (props.data.vital) {
                    points = Math.round(
                      10 *
                        (props.data.min_points +
                          Number(
                            (
                              ((props.data.max_points - props.data.min_points) *
                                (props.data.task_time -
                                  Number(
                                    localStorage.getItem("lastedSecond")
                                  ))) /
                              props.data.task_time
                            ).toFixed(2)
                          ))
                    );
                    if (!props.viewMode) {
                      props.changeTaskStatus(props.data.id, 2, points);
                    }
                  } else {
                    points = Math.round(
                      10 *
                        props.data.max_points *
                        Number(
                          (
                            (props.data.task_time -
                              Number(localStorage.getItem("lastedSecond"))) /
                            props.data.task_time
                          ).toFixed(2)
                        )
                    );
                    if (points < 0) {
                      points = 0;
                    }
                    if (!props.viewMode) {
                      props.changeTaskStatus(props.data.id, 2, points);
                      setLastedSecond(0);
                    }
                    localStorage.setItem("lastedSecond", "0");
                  }
                }
              } else {
                let questData = props.questData;
                questData.tasks_list[
                  props.data.task_num
                ].user_progress.status = 2;
                props.setQuestData([...questData]);
              }
            }
          }}
        />
      </div>
      <img
        hidden={
          props.data.user_progress.status === 0 ||
          props.data.user_progress.status === 1
        }
        src={`${process.env.PUBLIC_URL}/img/PassedTask.svg`}
        alt=""
      />
    </div>
  );
};

export default TaskView;
