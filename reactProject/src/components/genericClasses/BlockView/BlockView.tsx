import TaskView from "./TaskView/TaskView";
import Flickity from "react-flickity-component";
import "./BlockView.css";
const BlockView = (props: any) => {
  if (props.data.block_type === 0) {
    return (
      <div className="blockView">
        <div id="blockHeader_View" hidden={!props.viewMode}>
          <span id="blockName_View">{props.data.block_name}</span>
          <span id="blockCounter">
            {props.data.block_num + 1}/{props.length}
          </span>
        </div>
        {props.data.tasks_list.length ? (
          props.data.tasks_list.map((el: any) => {
            return (
              <TaskView
                questData={el}
                block_num={props.data.block_num}
                blockId={props.blockId}
                viewMode={props.viewMode}
                setData={props.setData}
                data={el}
                key={el.id}
                setQuestWasPasted={props.setQuestWasPasted}
              />
            );
          })
        ) : (
          <div></div>
        )}
      </div>
    );
  } else {
    const flickityOptions = {
      initialIndex: 0,
    };
    return (
      <div className="blockView parallelBlock">
        <div id="blockHeader_View" hidden={!props.viewMode}>
          <span id="blockName_View">{props.data.block_name}</span>
          <span id="blockCounter">
            {props.data.block_num + 1}/{props.length}
          </span>
        </div>
        <div>
          <div>
            Вам необходимо выполнить следующее количество из предложенных задач,
            помимо обязательных
          </div>
          <div>{props.remaining}</div>
        </div>
        <Flickity
          className="Slider"
          elementType="div"
          disableImagesLoaded={false}
          options={flickityOptions}
          static
        >
          {props.data.tasks_list.length ? (
            props.data.tasks_list.map((el: any) => {
              return (
                <TaskView
                  questData={props.questData}
                  changeTaskStatus={props.changeTaskStatus}
                  blockId={props.blockId}
                  setQuestData={props.setData}
                  setData={props.setData}
                  block_type={props.data.block_type}
                  viewMode={props.viewMode}
                  data={el}
                  key={el.id}
                  block_num={props.data.block_num}
                  setQuestWasPasted={props.setQuestWasPasted}
                />
              );
            })
          ) : (
            <div></div>
          )}
        </Flickity>
      </div>
    );
  }
};

export default BlockView;
