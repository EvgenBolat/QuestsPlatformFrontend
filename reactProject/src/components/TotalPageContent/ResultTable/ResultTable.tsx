import { JsxElement } from "typescript";
import "./ResultTable.css";
const ResultTable = (props: any) => {
  let dataNew = [<div>dfdfdf</div>];
  if (props.result.quest_type === 1) {
    console.log(props.result.results)
    for (let i = 0; i < props.result.results.length; i++) {
      if (i === 0) {
        dataNew[0] = (
          <div className="resultElement first">
            <div className="placeContainer">
              <div className="place">1</div>
            </div>
            <div className="resultElementInfo">
              <div className="resultUserInfo">
                {props.result.results[i].group_name}
              </div>
              <div className="resultPoints">
                {props.result.results[i].points} оч.
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
                {props.result.results[i].group_name}
              </div>
              <div className="resultPoints">
                {props.result.results[i].points} оч.
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
                {props.result.results[i].team_name}
              </div>
              <div className="resultPoints">
                {props.result.results[i].participants[0].points} оч.
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
                {props.result.results[i].team_name}
              </div>
              <div className="resultPoints">
                {props.result.results[i].participants[0].points} оч.
              </div>
            </div>
          </div>
        );
      }
    }
  } else {
    for (let i = 0; i < props.result.results.length; i++) {
      if (i === 0) {
        dataNew[0] = (
          <div className="resultElement first">
            <div className="placeContainer">
              <div className="place">1</div>
            </div>
            <div className="resultElementInfo">
              <div className="resultUserInfo">{`${props.result.results[i].last_name} ${props.result.results[i].first_name}`}</div>
              <div className="resultPoints">
                {props.result.results[i].points} оч.
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
              <div className="resultUserInfo">{`${props.result.results[i].last_name} ${props.result.results[i].first_name}`}</div>
              <div className="resultPoints">
                {props.result.results[i].points} оч.
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
              <div className="resultUserInfo">{`${props.result.results[i].last_name} ${props.result.results[i].first_name}`}</div>
              <div className="resultPoints">
                {props.result.results[i].points} оч.
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
              <div className="resultUserInfo">{`${props.result.results[i].last_name} ${props.result.results[i].first_name}`}</div>
              <div className="resultPoints">
                {props.result.results[i].points} оч.
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
