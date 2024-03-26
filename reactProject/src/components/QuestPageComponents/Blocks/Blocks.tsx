import TasksBlock from "./TasksBlock/TasksBlock";
import "./Blocks.css";
import { useEffect, useState } from "react";

const Blocks = (props: any) => {

  const defaultCard = { id: -1, order: -1, name: "", type: "parallel" };

  const [currentCard, setCurrentCard] = useState(defaultCard);

  function dragStartHandler(e: any, taskBlock: any) {
    setCurrentCard(taskBlock);
  }

  function dragEndHandler(e: any) {
    // e.target.style.background = 'rgb(0, 133, 255)'
  }

  function dragOverHandler(e: any) {
    e.preventDefault();
    // e.target.style.background = 'rgb(0, 91, 179)'
  }

  function dropHandler(e: any, TasksBlock: any) {
    e.preventDefault();
    props.setSaveButtonActive(true);
    if (currentCard.id === -1 || currentCard.id === -2) {
      let previosindex = props.blocks.indexOf(TasksBlock);
      props.blocks.splice(previosindex + 1, 0, {
        id: props.blocks.length + 1,
        order: previosindex + 1,
        type: currentCard.id === -1 ? "Consistent" : "Parallel",
        name: "Блок",
      });
      for (let index = previosindex + 2; index < props.blocks.length; index++) {
        props.blocks[index].order += 1;
      }
      props.setBlocks(props.blocks.slice());
    } else {
      props.setBlocks(
        props.blocks.map((c: any) => {
          if (c.id === TasksBlock.id) {
            return { ...c, order: currentCard.order };
          }
          if (c.id === currentCard.id) {
            return { ...c, order: TasksBlock.order };
          }
          return c;
        })
      );
    }
  }

  const sortCard = (a: any, b: any) => {
    return a.order > b.order ? 1 : -1;
  };

  const BuildBlocks = () => {
    if(props.blocks.length !== 0){
    let array = props.blocks.sort(sortCard).map((el: any) => {
      return (
        <div className="Element" key={el.id}>
          <TasksBlock
            data={el}
            last={false}
            taskBlockId={el.id}
            dragStart={dragStartHandler}
            dragEnd={dragEndHandler}
            dragOver={dragOverHandler}
            drop={dropHandler}
            setactionMenuData={props.setactionMenuData}
            isBlockWindowActive={props.isBlockWindowActive}
            setBlockWindowActive={props.setBlockWindowActive}
          />{" "}
          <img
            className="Arrow"
            src={`${process.env.PUBLIC_URL}/img/Arrow.svg`}
            alt=""
          />{" "}
        </div>
      );
    });
    array.pop();
    array.push(
      <TasksBlock
        data={props.blocks.at(-1)}
        last={true}
        key={props.blocks.at(-1)?.id}
        dragStart={dragStartHandler}
        dragEnd={dragEndHandler}
        dragOver={dragOverHandler}
        drop={dropHandler}
        setactionMenuData={props.setactionMenuData}
        isBlockWindowActive={props.isBlockWindowActive}
        setBlockWindowActive={props.setBlockWindowActive}
      />
    );
    return array;
    }
    else{
      return <div></div>
    }
  };

  return (
    <div id="BlocksField">
      <div id="Blocks">{BuildBlocks()}</div>
    </div>
  );
};

export default Blocks;
