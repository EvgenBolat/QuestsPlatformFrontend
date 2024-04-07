import { useState } from "react";

const AddingImageArea = (props: any) => {
  const [file, setFile] = useState("");
  function dragStartHandler(e: any) {
    e.preventDefault();
  }

  function dragEndHandler(e: any) {
    // e.target.style.background = 'rgb(0, 133, 255)'
  }

  function dragOverHandler(e: any) {
    e.preventDefault();
    // e.target.style.background = 'rgb(0, 91, 179)'
  }

  function changeSrc(file: any) {
    let fileReader = new FileReader();
    fileReader.onload = function () {
      if (typeof fileReader.result == "string") {
        props.setFilePath(fileReader.result);
        props.setImageFile(file);
      }
    };
    fileReader.readAsDataURL(file);
  }

  function dropHandler(e: any) {
    e.preventDefault();
    if (!e.dataTransfer.files.length) {
      return;
    }
    let file = e.dataTransfer.files[0];
    console.log(file.type);
    if (file.type === "image/jpeg" || file.type === "image/png") {
      changeSrc(file);
      props.setImageFile(file);
    }
  }

  function changeSrcFromForm(fileList: any) {
    if (fileList != null) {
      changeSrc(fileList[0]);
      props.setImageFile(fileList[0]);
    }
  }

  return (
    <div
      draggable={!props.typeOfWindow}
      onDragStart={dragStartHandler}
      onDragEnd={dragEndHandler}
      onDragOver={dragOverHandler}
      onDrop={dropHandler}
    >
      {props.filepath === "" ? (
        <div>
          <div>вставить изображение</div>
          <input
            hidden={props.typeOfWindow}
            disabled={props.typeOfWindow}
            type="file"
            name=""
            id=""
            accept="image/png, image/jpeg"
            onChange={(e) => changeSrcFromForm(e.target.files)}
          />
        </div>
      ) : (
        <div id="addingImagesElement">
          <div id="addingImageContainer">
            <img id="addingImage" src={props.filepath} alt="" />
          </div>

          <button
            hidden={props.typeOfWindow}
            disabled={props.typeOfWindow}
            onClick={(e) => {
              props.setFilePath("");
              props.setImageFile(undefined);
            }}
          >
            сбросить
          </button>
        </div>
      )}
    </div>
  );
};

export default AddingImageArea;
