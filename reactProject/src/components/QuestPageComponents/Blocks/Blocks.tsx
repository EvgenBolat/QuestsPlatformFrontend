import TasksBlock from "./TasksBlock/TasksBlock";
import "./Blocks.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Blocks = (props: any) => {
  const { userid, questid } = useParams();

  function dragStartHandler(e: any, taskBlock: any) {
    props.setCurrentCard(taskBlock);
  }

  function dragEndHandler(e: any) {
    // e.target.style.background = 'rgb(0, 133, 255)'
  }

  function dragOverHandler(e: any) {
    e.preventDefault();
    // e.target.style.background = 'rgb(0, 91, 179)'
  }
  const fetchData = async (taskBlock: any, currentCard: any) => {
    let previosindex = props.blocks.indexOf(taskBlock);
    const response = await fetch(
      `https://quests.projectswhynot.site/api/v1/quests/${questid}/block`,
      {
        method: "POST",
        body: JSON.stringify({
          auth_token: userid,
          block_type: currentCard.block_type,
          block_num: previosindex + 1,
          min_tasks: 0,
          block_name: "Блок № " + (previosindex + 1),
        }),
      }
    )
      .then((response) => response.json())
      .catch((error) => console.log(error));
    if (response.status === "OK") {
      props.blocks.splice(previosindex + 1, 0, {
        id: response.message.block_id,
        block_num: previosindex + 1,
        block_type: props.currentCard.block_type,
        min_tasks: props.currentCard.min_tasks,
        block_name: "Блок № " + (previosindex + 1),
      });
      for (let index = previosindex + 2; index < props.blocks.length; index++) {
        props.blocks[index].block_num += 1;
      }
      props.setBlocks(props.blocks.slice());
    }
  };

  function dropHandler(e: any, TasksBlock: any) {
    e.preventDefault();
    props.setSaveButtonActive(true);
    console.log(props.currentCard.id);
    if (props.currentCard.id === -1 || props.currentCard.id === -2) {
      fetchData(TasksBlock, props.currentCard);
    } else {
      props.setBlocks(
        props.blocks.map((c: any) => {
          if (c.id === TasksBlock.id) {
            return { ...c, block_num: props.currentCard.block_num };
          }
          if (c.id === props.currentCard.id) {
            return { ...c, block_num: TasksBlock.block_num };
          }
          return c;
        })
      );
    }
  }

  const sortCard = (a: any, b: any) => {
    return a.block_num > b.block_num ? 1 : -1;
  };

  const BuildBlocks = () => {
    console.log(props.blocks)
    if (props.blocks.length !== 0) {
      console.log(props.blocks);
      let array = props.blocks.sort(sortCard).map((el: any) => {
        return (
          <div className="Element" key={el.task_num}>
            <TasksBlock
              setCurrentCard={props.setCurrentCard}
              data={el}
              last={false}
              setBlockWindowID={props.setBlockWindowID}
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
          setCurrentCard={props.setCurrentCard}
          setBlockWindowID={props.setBlockWindowID}
          key={props.blocks.at(-1)?.task_num}
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
    } else {
      return (
        <div className="Element">
          <TasksBlock
            data={{ name: "стартовый блок", block_type: 0 }}
            isStarted={true}
            last={false}
            setBlockWindowID={props.setBlockWindowID}
            taskBlockId={"-1"}
            dragStart={dragStartHandler}
            dragEnd={dragEndHandler}
            dragOver={dragOverHandler}
            drop={dropHandler}
            setactionMenuData={props.setactionMenuData}
            isBlockWindowActive={props.isBlockWindowActive}
            setBlockWindowActive={props.setBlockWindowActive}
          />
        </div>
      );
    }
  };

  return (
    <div id="BlocksField">
      <div id="Blocks">{BuildBlocks()}</div>
    </div>
  );
};

export default Blocks;
