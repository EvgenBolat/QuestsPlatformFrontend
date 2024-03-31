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
        {props.data.tasks.map((el: any) => {
          return (
            <TaskView
              blockId={props.blockId}
              viewMode={props.viewMode}
              data={el}
              key={el.id}
            />
          );
        })}
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
        <Flickity
          className="Slider"
          elementType="div"
          disableImagesLoaded={false}
          options={flickityOptions}
          static
        >
          {props.data.tasks.map((el: any) => {
            return (
              <TaskView
                questData={props.questData}
                blockId={props.blockId}
                setData={props.setData}
                block_type={props.data.block_type}
                viewMode={props.viewMode}
                data={el}
                key={el.id}
              />
            );
          })}
        </Flickity>
      </div>
    );
  }
};

export default BlockView;
