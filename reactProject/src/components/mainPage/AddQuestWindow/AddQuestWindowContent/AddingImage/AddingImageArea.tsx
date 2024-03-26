import { useState } from "react";

const AddingImageArea = (props: any) => {
  const [filepath, setFilePath] = useState("");
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
        setFilePath(fileReader.result);
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
    }
  }

  function changeSrcFromForm(fileList: any){
    if(fileList != null){
      changeSrc(fileList[0])
    }
  }

  return (
    <div
      draggable={true}
      onDragStart={dragStartHandler}
      onDragEnd={dragEndHandler}
      onDragOver={dragOverHandler}
      onDrop={dropHandler}
    >
      {filepath === "" ? (
        <div>
          <div>вставить изображение</div>
          <input type="file" name="" id="" accept="image/png, image/jpeg" onChange={(e) => changeSrcFromForm(e.target.files)} />
        </div>
      ) : (
        <div>
          <img src={filepath} alt="" />
          <button onClick={(e) => setFilePath("")}>сбросить</button>
        </div>
      )}
    </div>
  );
};

export default AddingImageArea;

