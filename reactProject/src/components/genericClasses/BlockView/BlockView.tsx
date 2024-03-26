import TaskView from "./TaskView/TaskView";

const BlockView = (props: any) => {
  return (
    <div>
        <div hidden={!props.viewMode}>{props.data.block_name} {props.data.block_num + 1}/{props.length}</div>
      {props.data.tasks.map((el: any) => {
        return <TaskView viewMode={props.viewMode} data={el} key={el.id} />;
      })}
    </div>
  );
};

export default BlockView;
