import { useLocation, useParams } from "react-router-dom";
import BlockView from "../../genericClasses/BlockView/BlockView";
import "./ViewList.css";
import { useEffect, useState } from "react";

const ViewList = (props: any) => {
  console.log(props.datafromServer)
  return (
    <div className="viewList">
      {props.datafromServer.length ? (
        props.datafromServer.map((el: any) => {
          return (
            <BlockView
              setData={props.setDataFromServer}
              questData={props.datafromServer}
              viewMode={true}
              length={props.datafromServer.length}
              data={el}
              key={el.id}
              blockId={el.id}
              remaining={el.min_tasks}
            />
          );
        })
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default ViewList;
