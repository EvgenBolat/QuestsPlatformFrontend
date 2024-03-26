import { useState } from "react";
import "./AddQuestWindowContent.css";
import AddingImageArea from "./AddingImage/AddingImageArea";

const AddQuestWindowContent = (props: any) => {
  let startDate = new Date();
  const [minStartDate] = useState(new Date(startDate));
  let endDate = new Date(startDate);
  endDate.setMinutes(endDate.getMinutes() + 5);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [start_time, setStartTime] = useState(startDate.toLocaleTimeString());
  const [minEndDate] = useState(new Date(endDate));
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
          let stringStart = start_date + " в " + start_time;
          let stringEnd = end_date + " в " + end_date;
          let array = [
            ...props.questList,
            {
              id: 12,
              isCreated: true,
              name: name,
              image:
                "https://i.pinimg.com/564x/4e/9c/5d/4e9c5dd27f34dd02b0f16e8bd7108dc7.jpg",
              description: description,
              data_of_start: stringStart,
              data_of_end: stringEnd,
            },
          ];
          props.setQuestList(array);
        }}
      >
        <AddingImageArea />
        <div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            name="name"
            id="name"
            placeholder="Название квеста"
          />{" "}
          <br />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="textarea"
            name="description"
            id="description"
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
            }}
            min={minStartDate.toLocaleTimeString()}
            type="time"
            name="start_time"
            id="start_time"
          />{" "}
          <br />
          <input
            value={end_date}
            onChange={(e) => setEndDate(e.target.value)}
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
            onChange={(e) => setEndTime(e.target.value)}
            type="time"
            min={minEndDate.toLocaleTimeString()}
            name="end_time"
            id="end_time"
          />{" "}
          <div>
            <input type="submit" value="Создать" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddQuestWindowContent;
