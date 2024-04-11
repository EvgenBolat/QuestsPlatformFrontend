import { useEffect, useId, useState } from "react";
import "./AddQuestWindowContent.css";
import AddingImageArea from "./AddingImage/AddingImageArea";
import { useNavigate, useParams } from "react-router-dom";
import { json } from "stream/consumers";

const AddQuestWindowContent = (props: any) => {
  const [filepath, setFilePath] = useState("");
  const navigate = useNavigate();
  let startDate = new Date();
  const { questid } = useParams();
  const userid = localStorage.getItem("id")
  const [minStartDate] = useState(new Date(startDate));
  let endDate = new Date(startDate);
  endDate.setMinutes(endDate.getMinutes() + 5);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [typeOfQuest, setTypeOfQuest] = useState(-1);
  const [start_time, setStartTime] = useState(startDate.toLocaleTimeString());
  const [minEndDate] = useState(new Date(endDate));
  const [isHaveChanges, setHaveChanges] = useState(false);
  const [imageFile, setImageFile] = useState<File>();
  useEffect(() => {
    if (props.typeOfWindow === 1) {
      const fetchData = async () => {
        const response = await fetch(
          `https://quests.projectswhynot.site/api/v1/quests/${questid}`,
          {
            method: "POST",
            body: JSON.stringify({ auth_token: userid }),
          }
        )
          .then((response) => response.json())
          .catch((error) => console.log(error));
        if (response.status === "OK") {
          setName(response.message.quest_name);
          setDescription(response.message.short);
          setStartDate(response.message.start_time.split(" ")[0]);
          setStartTime(response.message.start_time.split(" ")[1]);
          setEndDate(response.message.end_time.split(" ")[0]);
          setEndTime(response.message.end_time.split(" ")[1]);
          setTypeOfQuest(response.message.quest_type);
          setFilePath(
            `https://quests.projectswhynot.site/api/v1/static/${response.message.quest_image}`
          );
        }
      };
      fetchData();
    }
  }, []);
  const [end_date, setEndDate] = useState(
    endDate
      .toLocaleString("ru-RU", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      })
      .split(".")
      .reverse()
      .join("-")
  );

  const [start_date, setStartDate] = useState(
    startDate
      .toLocaleString("ru-RU", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      })
      .split(".")
      .reverse()
      .join("-")
  );
  const [end_time, setEndTime] = useState(endDate.toLocaleTimeString());
  return (
    <div className="AddQuestWindowContent">
      <form
        action=""
        className="AddQuestWindowContentForm"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <AddingImageArea
          setFilePath={setFilePath}
          filepath={filepath}
          setImageFile={setImageFile}
          setHaveChanges={setHaveChanges}
          typeOfWindow={props.typeOfWindow}
        />
        <div>
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setHaveChanges(true);
            }}
            type="text"
            name="name"
            max={62}
            id="QuestName"
            placeholder="Название квеста"
          />{" "}
          <br />
          <textarea
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setHaveChanges(true);
            }}
            name="description"
            id="descriptionArea"
            placeholder="Описание"
          />{" "}
          <br />
          <input
            value={start_date}
            onChange={(e) => {
              let startDate = new Date(e.target.value).valueOf();
              let endDate = new Date(end_date).valueOf();
              if (endDate - startDate < 0) {
                setEndDate(e.target.value);
              }
              setStartDate(e.target.value);
              setHaveChanges(true);
            }}
            min={minStartDate
              .toLocaleString("ru-RU", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
              })
              .split(".")
              .reverse()
              .join("-")}
            type="date"
            name="start_date"
            id="start_date"
          />
          <input
            value={start_time}
            onChange={(e) => {
              let startDate = new Date(start_date + " " + e.target.value);
              let endDate = new Date(end_date + " " + end_time);
              if (endDate.valueOf() - startDate.valueOf() < 300000) {
                endDate = new Date(startDate);
                endDate.setMinutes(endDate.getMinutes() + 5);
                setEndDate(
                  endDate
                    .toLocaleString("ru-RU", {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                    })
                    .split(".")
                    .reverse()
                    .join("-")
                );
                setEndTime(endDate.toLocaleTimeString());
              }
              setStartTime(e.target.value);
              setHaveChanges(true);
            }}
            min={minStartDate.toLocaleTimeString()}
            type="time"
            name="start_time"
            id="start_time"
          />{" "}
          <br />
          <input
            value={end_date}
            onChange={(e) => {
              setEndDate(e.target.value);
              setHaveChanges(true);
            }}
            min={minEndDate
              .toLocaleString("ru-RU", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
              })
              .split(".")
              .reverse()
              .join("-")}
            type="date"
            name="end_date"
            id="end_date"
          />
          <input
            value={end_time}
            onChange={(e) => {
              setEndTime(e.target.value);
              setHaveChanges(true);
            }}
            type="time"
            min={minEndDate.toLocaleTimeString()}
            name="end_time"
            id="end_time"
          />
        </div>
      </form>
      <div className="lowerButtons">
        <div className="chooseTypeOfQuest">
          <div>Режим:</div>
          <select
            name="questtype"
            value={typeOfQuest}
            disabled={props.typeOfWindow === 1}
            id="questType"
            onChange={(e) => {
              setTypeOfQuest(Number(e.target.value));
            }}
          >
            <option value={-1} selected hidden>
              Выберите режим квеста
            </option>
            <option value={0}>Одиночный</option>
            <option value={1}>Командный</option>
          </select>
        </div>
        <button
          disabled={
            (props.typeOfWindow === 0 && typeOfQuest === -1) ||
            (props.typeOfWindow === 1 && !isHaveChanges)
          }
          onClick={async (e) => {
            if (props.typeOfWindow === 0) {
              let formData = new FormData();
              if (userid) {
                formData.append("auth_token", userid);
                formData.append("quest_name", name);
                formData.append("short", description);
                formData.append("quest_type", `${typeOfQuest}`);
                formData.append("start_time", start_date + " " + start_time);
                formData.append("end_time", end_date + " " + end_time);
              }
              if (imageFile) {
                formData.append("image", imageFile, imageFile?.name);
              } else {
                let url = `${process.env.PUBLIC_URL}/img/defaultImage.png`;
                let file = await fetch(url)
                  .then((r) => r.blob())
                  .then(
                    (blobFile) =>
                      new File([blobFile], "defaultImage.png", {
                        type: "image/png",
                      })
                  );
                formData.append("image", file, file.name);
              }
              const send = await fetch(
                "https://quests.projectswhynot.site/api/v1/quests/create",
                {
                  method: "POST",
                  body: formData,
                }
              ).then((responce) => responce.json());
              props.setAddQuestWindowActive(false);
              window.location.reload();
            } else if (props.typeOfWindow === 1) {
              let formData = new FormData();
              if (userid) {
                formData.append("auth_token", userid);
                formData.append("quest_name", name);
                formData.append("short", description);
                formData.append("start_time", start_date + " " + start_time);
                formData.append("end_time", end_date + " " + end_time);
                setHaveChanges(false);
                const sendChanges = await fetch(
                  `https://quests.projectswhynot.site/api/v1/quests/${questid}`,
                  {
                    method: "PUT",
                    body: JSON.stringify({
                      auth_token: userid,
                      quest_name: name,
                      short: description,
                      start_time: start_date + " " + start_time,
                      end_time: end_date + " " + end_time,
                    }),
                  }
                ).then((responce) => responce.json());
                props.setAddQuestWindowActive(false);
                window.location.reload();
              }
            }
          }}
        >
          {props.typeOfWindow === 0 ? "Создать" : "Сохранить изменения"}
        </button>
      </div>
    </div>
  );
};

export default AddQuestWindowContent;
