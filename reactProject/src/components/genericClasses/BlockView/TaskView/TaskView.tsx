import { useEffect, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

import "./taskView.css";
const TaskView = (props: any) => {
  const [time, setTime] = useState(props.data.second);
  const [isQrCodeScanningEnabled, setQrCodeScanningEnabled] = useState(false);
  const [asnwer, setAnswer] = useState("");

  useEffect(() => {
    const config = { fps: 10, qrbox: { width: 200, height: 200 } };
    let html5QrCode = new Html5Qrcode("simple");

    const qrScannerStop = () => {
      if (Html5Qrcode && html5QrCode.isScanning) {
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
        setAnswer("");
      } else {
        qrScannerStop();
      }
    }

    return () => {
      qrScannerStop();
    };
  }, [asnwer, isQrCodeScanningEnabled]);

  useEffect(() => {
    console.log(asnwer);
  }, [asnwer]);
  return (
    <div className="TaskView">
      <h1 id="taskName">Задача № {props.data.task_num + 1}</h1>
      <div>
        <h1 id="descrHeader">Описание к задаче:</h1>
        <textarea readOnly name="" id="description" value={props.data.description}></textarea>
        <form id="taskform">
          <p className="taskAction" hidden={props.data.task_type !== 0}>
            Ответьте правильно на вопрос!
          </p>
          <p hidden={props.data.task_type !== 0}>{props.data.question}</p>
          <p hidden={props.data.task_type !== 0}>Ваш ответ:</p>
          <input
            hidden={props.data.task_type !== 0}
            type="text"
            name=""
            id=""
          />
          <p className="taskAction" hidden={props.data.task_type !== 1}>
            Найдите нужную точку и отсканируйте QR-код!
          </p>
          <p className="taskAction" hidden={props.data.task_type !== 2}>
            Найдите нужного героя и отсканируйте QR-код!
          </p>
          {isQrCodeScanningEnabled ? (
            <div className="scanner">
              <div id="qrCodeContainer"></div>
              <h1
                className="cameraOff"
                onClick={() => setQrCodeScanningEnabled(false)}
              >
                Выключить камеру
              </h1>
            </div>
          ) : (
            <div id="simple"> </div>
          )}

          <img
            hidden={props.data.task_type !== 1 && props.data.task_type !== 2}
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
          <p  hidden={props.data.task_type !== 1 && props.data.task_type !== 2} id="openCameraText">Открыть камеру</p>
        </form>
        <p id="filesHeaderText">Приложенные файлы:</p>
        <img id="filesDownloadButton" src={`${process.env.PUBLIC_URL}/img/document.svg`} alt="" />
        <h1 id="attentionHeaderText" hidden={!props.data.vital}>Внимание!</h1>
        <p className="simpleTaskText attentionDescr" hidden={!props.data.vital}>Данная Задача является обязательной</p>
        <p className="simpleTaskText">У вас осталось:</p>
        <h1 id="taskTime">
          {time / 60 < 10 ? "0" : ""}
          {Math.floor(time / 60)}:{time % 60 < 10 ? "0" : ""}
          {time % 60}
        </h1>
        <p hidden={!props.data.vital}>
          При выполнении задания позднее вы получите лишь:
        </p>
        <h1 hidden={!props.data.vital}>{props.data.min_points}</h1>
        <p hidden={!props.data.vital}> баллов</p>
        <input type="submit" value="Ответить" form="taskform" />
      </div>
    </div>
  );
};

export default TaskView;
