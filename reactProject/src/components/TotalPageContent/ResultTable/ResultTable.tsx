import { JsxElement } from "typescript";
import "./ResultTable.css";
const ResultTable = (props: any) => {
  let dataNew = [<div>dfdfdf</div>];
  if (props.result.quest_type === 1) {
    for (let i = 0; i < props.result.data.length; i++) {
      if (i === 0) {
        dataNew[0] = (
          <div className="resultElement first">
            <div className="placeContainer">
              <div className="place">1</div>
            </div>
            <div className="resultElementInfo">
              <div className="resultUserInfo">
                {props.result.data[i].team_name}
              </div>
              <div className="resultPoints">
                {props.result.data[i].participants[0].points} оч.
              </div>
            </div>
          </div>
        );
      } else if (i === 1) {
        dataNew.push(
          <div className="resultElement second">
            <div className="placeContainer">
              <div className="place">2</div>
            </div>
            <div className="resultElementInfo">
              <div className="resultUserInfo">
                {props.result.data[i].team_name}
              </div>
              <div className="resultPoints">
                {props.result.data[i].participants[0].points} оч.
              </div>
            </div>
          </div>
        );
      } else if (i === 2) {
        dataNew.push(
          <div className="resultElement third">
            <div className="placeContainer">
              <div className="place">3</div>
            </div>
            <div className="resultElementInfo">
              <div className="resultUserInfo">
                {props.result.data[i].team_name}
              </div>
              <div className="resultPoints">
                {props.result.data[i].participants[0].points} оч.
              </div>
            </div>
          </div>
        );
      } else {
        dataNew.push(
          <div className="resultElement">
            <div className="placeContainer">
              <div className="place">{i + 1}</div>
            </div>
            <div className="resultElementInfo">
              <div className="resultUserInfo">
                {props.result.data[i].team_name}
              </div>
              <div className="resultPoints">
                {props.result.data[i].participants[0].points} оч.
              </div>
            </div>
          </div>
        );
      }
    }
  } else {
    for (let i = 0; i < props.result.data.length; i++) {
      if (i === 0) {
        dataNew[0] = (
          <div className="resultElement first">
            <div className="placeContainer">
              <div className="place">1</div>
            </div>
            <div className="resultElementInfo">
              <div className="resultUserInfo">{props.result.data[i].user_info}</div>
              <div className="resultPoints">
                {props.result.data[i].points} оч.
              </div>
            </div>
          </div>
        );
      } else if (i === 1) {
        dataNew.push(
          <div className="resultElement second">
            <div className="placeContainer">
              <div className="place">2</div>
            </div>
            <div className="resultElementInfo">
              <div className="resultUserInfo">{props.result.data[i].user_info}</div>
              <div className="resultPoints">
                {props.result.data[i].points} оч.
              </div>
            </div>
          </div>
        );
      } else if (i === 2) {
        dataNew.push(
          <div className="resultElement third">
            <div className="placeContainer">
              <div className="place">3</div>
            </div>
            <div className="resultElementInfo">
              <div className="resultUserInfo">{props.result.data[i].user_info}</div>
              <div className="resultPoints">
                {props.result.data[i].points} оч.
              </div>
            </div>
          </div>
        );
      } else {
        dataNew.push(
          <div className="resultElement">
            <div className="placeContainer">
              <div className="place">{i + 1}</div>
            </div>
            <div className="resultElementInfo">
              <div className="resultUserInfo">{props.result.data[i].user_info}</div>
              <div className="resultPoints">
                {props.result.data[i].points} оч.
              </div>
            </div>
          </div>
        );
      }
    }
  }

  return <div>{dataNew}</div>;
};

export default ResultTable;
