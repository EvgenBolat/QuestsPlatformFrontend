import { useEffect, useState } from "react";
import "./FinishScreen.css";
import { useParams } from "react-router-dom";

const FinishScreen = (props: any) => {
  const { questid } = useParams();
  const userid = localStorage.getItem("id");
  const [userPoints, setUserPoints] = useState(0);

  const [pointsChanged, setPointsChanged] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://quests.projectswhynot.site/api/v1/quests/${questid}/points`,
        {
          method: "POST",
          body: JSON.stringify({ auth_token: userid }),
        }
      )
        .then((response) => response.json())
        .catch((error) => console.log(error));
      if (response.status === "OK") {
        setUserPoints(response.message.points);
        setPointsChanged(true);
      }
    };
    setTimeout(fetchData, 2000);
  }, []);
  useEffect(() => {
    const balloonContainer = document.getElementById("balloon-container");
    function createBalloons(num: any) {
      for (var i = num; i > 0; i--) {
        var balloon = document.createElement("div");
        balloon.className = "balloon";
        balloon.style.cssText = getRandomStyles();
        balloonContainer?.append(balloon);
      }
    }
    const congradilations = document.getElementById("Congratilations");
    createBalloons(10);
    if (pointsChanged) {
      setTimeout(() => {
        if (congradilations?.innerHTML !== `Вы набрали ${userPoints} очков`) {
          if (congradilations) {
            congradilations.innerHTML = `Вы набрали ${userPoints} очков`;
          }
        }
      }, 6000);
      setTimeout(() => {
        props.setTasksOvered(true);
        props.setStartedAsking(true);
        props.setAnyTaskNoCompleted(false);
        props.setQuestWasPasted(true);
      }, 10000);
    }
  }, [userPoints]);

  function random(num: any) {
    return Math.floor(Math.random() * num);
  }

  function getRandomStyles() {
    var r = random(255);
    var g = random(255);
    var b = random(255);
    var mt = random(200);
    var ml = random(50);
    var dur = random(5) + 5;
    return `
    background-color: rgba(${r},${g},${b},0.7);
    color: rgba(${r},${g},${b},0.7); 
    box-shadow: inset -7px -3px 10px rgba(${r - 10},${g - 10},${b - 10},0.7);
    margin: ${mt}px 0 0 ${ml}px;
    animation: float ${dur}s ease-in infinite
    `;
  }

  return (
    <div id="FinishContainer">
      <div id="Congratilations">Квест завершён!</div>
      <div id="balloon-container"></div>
    </div>
  );
};

export default FinishScreen;
