import { useEffect } from "react";
import "./FinishScreen.css";

const FinishScreen = (props: any) => {
  const userPoints = 305;
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
    setTimeout(() => {
      if (congradilations?.innerHTML !== `Вы набрали ${userPoints} очков`) {
        if (congradilations) {
          congradilations.innerHTML = `Вы набрали ${userPoints} очков`;
        }
      }
    }, 5000);
    createBalloons(10);
    setTimeout(() => {
      props.setAnyTaskNoCompleted(false);
    }, 10000);
  });

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
