import { useLocation, useNavigate, useParams } from "react-router-dom";
import MainHeader from "../mainPage/Header/mainHeader";
import QuestHeader from "./QuestHeader/QuestHeader";
import Blocks from "./Blocks/Blocks";
import QuestFooter from "./QuestFooter/QuestFooter";
import "./QuestPage.css";
import CreationBlocksMenu from "./CreationBlocksMenu/CreationBlocksMenu";
import { useEffect, useState } from "react";
import BlockWindow from "../Windows/BlockWindow/BlockWindow";
import ProfileWindow from "../mainPage/Header/ProFileWindow/ProFileWindow";
import ActionMenu from "../genericClasses/ActionMenu/ActionMenu";
import TaskWindow from "../Windows/TaskWindow/TaskWindow";
import SaveBlockButton from "./SaveBlocksButton/SaveBlocksButton";
import ClarifyingWindow from "../Windows/ClarifuyingWindow/ClarifyingWindow";
import TaskView from "../genericClasses/BlockView/TaskView/TaskView";
import BlockView from "../genericClasses/BlockView/BlockView";
import FinishScreen from "./FinishScreen/FinishScreen";
import ParticipantWindow from "../Windows/ParticipantWindow/ParticipantWindow";
import ParticipantsListWindow from "../Windows/ParticipantsListWindow/ParticipantsListWindow";
import AddQuestWindow from "../mainPage/AddQuestWindow/AddQuestWindow";

const QuestPage = () => {
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        `https://quests.projectswhynot.site/api/v1/quests/${questid}`,
        {
          method: "POST",
          body: JSON.stringify({ auth_token: userid }),
        }
      )
        .then((responce) => responce.json())
        .catch((error) => console.log(error));
      console.log(data);
      if (data.status === "OK") {
        if (data.message.role === -1) {
          console.log("создатель");
          setRole(-1);
          setBlocks(data.message.blocks_list);
          setQuestName(data.message.quest_name);
        }
      }
    };
    fetchData();
  }, []);
  const location = useLocation();
  const navigation = useNavigate();

  const [isClarifyingWindowActive, setIsClarifyingWindowActive] =
    useState(false);
  const [startQuest, setStartQuest] = useState(false);

  const [ClarifuyingWindowData, setClarifyingWindowData] = useState(null);
  const [isBlockWindowActive, setBlockWindowActive] = useState(false);

  const [isCreationTaskWindowActive, setCreationTaskWindowActive] =
    useState(false);
  const [leftPosition, setLeftPosition] = useState(0);
  const [topPosition, setTopPosition] = useState(0);

  const [isSimpleTaskWindowActive, setSimpleTaskWindowActive] = useState(false);

  const [isParticipantWindowActive, setParticipantWindowActive] =
    useState(false);

  const [isParticipantsListWindowActive, setParticipantsListWindowActive] =
    useState(false);

  const [isActionMenuOpen, setActionMenuOpen] = useState(false);

  const [isProfileWindowActive, setProfileWindowActive] = useState(false);

  const [isSaveButtonActive, setSaveButtonActive] = useState(false);

  const [questType, setQuestType] = useState(1);

  const CountDown = (days = 0, hours = 0, minutes = 0, seconds = 0) => {
    const [paused, setPaused] = useState(false);
    const [over, setOver] = useState(false);
    const [[d, h, m, s], setTime] = useState([days, hours, minutes, seconds]);

    const tick = () => {
      if (paused || over) return;

      if ((h === 0 && m === 0 && s === 0) || d < 0 || h < 0 || m < 0 || s < 0) {
        setOver(true);
        setStartQuest(true);
      } else if (h === 0 && m === 0 && s === 0) {
        setTime([d - 1, 23, 59, 59]);
      } else if (m === 0 && s === 0) {
        setTime([d, h - 1, 59, 59]);
      } else if (s === 0) {
        setTime([d, h, m - 1, 59]);
      } else {
        setTime([d, h, m, s - 1]);
      }
    };

    useEffect(() => {
      const timerID = setInterval(() => tick(), 1000);
      return () => clearInterval(timerID);
    });

    useEffect(() => {
      if (days < 0 || hours < 0 || minutes < 0 || seconds < 0) {
        setStartQuest(true);
      }
    }, [days, hours, minutes, seconds]);

    return startQuest ? (
      <div></div>
    ) : (
      <div id="questStartDataCounter">
        <div>До начала квеста осталось:</div>
        {`${d.toString().padStart(2, "0")} д. ${h
          .toString()
          .padStart(2, "0")} ч. ${m.toString().padStart(2, "0")} м. ${s
          .toString()
          .padStart(2, "0")} с.`}
      </div>
    );
  };
  const [questName, setQuestName] = useState("");
  const [role, setRole] = useState(-2);
  const [questData, setQuestData] = useState([
    {
      id: 1,
      block_type: 0,
      block_name: "fdfdf",
      block_num: 0,
      vits: 0,
      tasks: [
        {
          id: 0,
          task_type: 2,
          task_num: 0,
          state: 2,
          vital: true,
          description: "Найдите эльфа, и получите у него горшочек с золото",
          question: "",
          answer: "jfdfvkkhbsfhv",
          files: [
            `${process.env.PUBLIC_URL}/img/document.svg`,
            `${process.env.PUBLIC_URL}/img/camera.svg`,
            `${process.env.PUBLIC_URL}/img/openedEye.svg`,
          ],
          npc_email: "Vika@hse.edu.ru",
          min_points: 2,
          max_points: 4,
          task_time: 160,
        },
        {
          id: 1,
          task_type: 0,
          task_num: 1,
          state: 2,
          vital: false,
          description: "Ну вы придурки, если ответите неправильно",
          question: "how old are you?",
          answer: "14",
          files: [],
          npc_email: "",
          min_points: 2,
          max_points: 4,
          task_time: 30,
        },
        {
          id: 2,
          task_type: 1,
          task_num: 2,
          state: 2,
          files: [],
          vital: true,
          description: "Ура, картинОчка",
          question: "",
          answer: "3i4ujfhbbshdbfvcf",
          npc_email: "",
          min_points: 2,
          max_points: 4,
          task_time: 160,
        },
      ],
    },
    {
      id: 2,
      block_name: "Gold",
      min_tasks: 2,
      block_type: 1,
      block_num: 1,
      vits: 0,
      tasks: [
        {
          id: 0,
          task_type: 2,
          task_num: 0,
          state: 2,
          vital: true,
          files: [],
          description: "Найдите эльфа, и получите у него горшочек с золото",
          question: "",
          answer: "",
          npc_email: "Vika@hse.edu.ru",
          min_points: 2,
          max_points: 4,
          task_time: 160,
        },
        {
          id: 1,
          task_type: 0,
          task_num: 1,
          state: 2,
          vital: false,
          files: [],
          description: "Ну вы придурки, если ответите неправильно",
          question: "how old are you?",
          answer: "14",
          correct_answer: "",
          npc_email: "",
          min_points: 2,
          max_points: 4,
          task_time: 180,
        },
        {
          id: 2,
          task_type: 1,
          task_num: 2,
          vital: false,
          state: 2,
          description: "Ура, картинОчка",
          question: "",
          answer: "",
          correct_answer: "3i4ujfhbbshdbfvcf",
          npc_email: "",
          files: [],
          min_points: 2,
          max_points: 4,
          task_time: 160,
        },
      ],
    },
    {
      id: 3,
      block_name: "JFDkds",
      block_type: 0,
      block_num: 2,
      vits: 0,
      tasks: [
        {
          id: 0,
          task_type: 2,
          task_num: 0,
          state: 2,
          vital: true,
          files: [],
          description: "Найдите эльфа, и получите у него горшочек с золото",
          question: "",
          answer: "",
          correct_answer: "jfdfvkkhbsfhv",
          npc_email: "Vika@hse.edu.ru",
          min_points: 2,
          max_points: 4,
          task_time: 160,
        },
        {
          id: 1,
          task_type: 0,
          task_num: 1,
          state: 2,
          files: [],
          vital: false,
          description: "Ну вы придурки, если ответите неправильно",
          question: "how old are you?",
          answer: "14",
          correct_answer: "",
          npc_email: "",
          min_points: 2,
          max_points: 4,
          task_time: 180,
        },
        {
          id: 2,
          task_type: 1,
          task_num: 2,
          state: 2,
          vital: true,
          files: [],
          description: "Ура, картинОчка",
          question: "",
          answer: "",
          correct_answer: "3i4ujfhbbshdbfvcf",
          npc_email: "",
          min_points: 2,
          max_points: 4,
          task_time: 30,
        },
      ],
    },
  ]);
  const defaultCard = { id: -1, order: -1, name: "", type: "parallel" };

  const [currentCard, setCurrentCard] = useState(defaultCard);

  const [tasks, setTasks] = useState([
    
  ]);

  const [isAddQuestWindowActive, setAddQuestWindowActive] = useState(false);


  const [blocks, setBlocks] = useState([]);

  let changeBlocks: any = null;

  const [taskId, setTaskId] = useState("");

  const [actionMenuData, setactionMenuData] = useState(null);

  function useQuestData() {
    return [
      [taskId, setTaskId],
      [blockWindowID, setBlockWindowID],
    ];
  }

  const [isQuestCompletedByAllPlayers, setQuestCompletedByAllPlayer] =
    useState(true);

  const [typeOfParticipantWindow, setTypeOfParticipantWindow] = useState(0);

  const [blockWindowID, setBlockWindowID] = useState(null);

  const [isAnyTaskNoCompleted, setAnyTaskNoCompleted] = useState(false);

  const [isInCommand, setInCommand] = useState(false);

  const getCurrentTask = () => {
    if (startQuest) {
      if (questType && !isInCommand) {
        navigate(`/user/${userid}/`);
        return;
      }
      for (let blockNum = 0; blockNum < questData.length; blockNum++) {
        for (
          let taskNum = 0;
          taskNum < questData[blockNum].tasks.length;
          taskNum++
        ) {
          if (questData[blockNum].tasks[taskNum].state === 1) {
            return (
              <div className="taskParticipating">
                <TaskView
                  blockId={questData[blockNum].id}
                  block_num={blockNum}
                  viewMode={false}
                  questData={questData}
                  data={questData[blockNum].tasks[taskNum]}
                  setQuestData={setQuestData}
                  setAnyTaskNoCompleted={setAnyTaskNoCompleted}
                />
              </div>
            );
          }
        }
      }
      for (let blockNum = 0; blockNum < questData.length; blockNum++) {
        if (questData[blockNum].block_type === 1) {
          let countOfCompletedVital = 0;
          let countOfVital = 0;
          let countOfCompletedSimple = 0;
          questData[blockNum].tasks.forEach(function (task: any) {
            if (task.vital) {
              countOfVital += 1;
              if (task.state === 2) {
                countOfCompletedVital += 1;
              }
            } else if (task.state === 2) {
              countOfCompletedSimple += 1;
            }
          });
          if (
            countOfCompletedVital !== countOfVital ||
            countOfCompletedSimple !== questData[blockNum].min_tasks
          ) {
            return (
              <div className="taskParticipating">
                <BlockView
                  setData={setQuestData}
                  questData={questData}
                  viewMode={false}
                  length={questData[blockNum].tasks.length}
                  data={questData[blockNum]}
                  key={questData[blockNum].id}
                  blockId={questData[blockNum].id}
                />
              </div>
            );
          }
        } else {
          for (
            let taskNum = 0;
            taskNum < questData[blockNum].tasks.length;
            taskNum++
          ) {
            if (
              questData[blockNum].tasks[taskNum].state === 0 &&
              questData[blockNum].block_type === 0
            ) {
              questData[blockNum].tasks[taskNum].state = 1;
              setQuestData([...questData]);
              return <div></div>;
            }
          }
        }
      }
      if (isAnyTaskNoCompleted) {
        return <FinishScreen setAnyTaskNoCompleted={setAnyTaskNoCompleted} />;
      } else {
        if (!isQuestCompletedByAllPlayers) {
          return (
            <div id="waitingBody">
              Ожидайте завершение квеста другими игроками
            </div>
          );
        } else {
          if (questType === 1 && !isInCommand) {
            navigate(`/user/${userid}/`);
            return <div></div>;
          } else {
            let url = `/user/${userid}/quest/${questid}/total`;
            navigate(url);
            return <div></div>;
          }
        }
      }
    } else {
      return <div></div>;
    }
  };

  const start_date = "30.03.2024 20:43";

  const [deleteId, setDeleteID] = useState("");

  const { userid, questid } = useParams();
  const navigate = useNavigate();

  const [isTeamCreator, setTeamCreator] = useState(false);
  const [teamName, setTeamName] = useState("");
  if (role === 0) {
    let timeArray = start_date.split(" ")[1].split(":");
    let dateArray = start_date.split(" ")[0].split(".");
    let date = new Date(
      Number(dateArray[2]),
      Number(dateArray[1]) - 1,
      Number(dateArray[0]),
      Number(timeArray[0]),
      Number(timeArray[1])
    );
    let currentDate = new Date();
    let days = Math.floor((+date - +currentDate) / (60 * 60 * 24 * 1000));
    let hours = Math.floor(
      Math.floor(+date - +currentDate - days * 60 * 60 * 24 * 1000) /
        (60 * 60 * 1000)
    );
    let minutes = Math.floor(
      Math.floor(
        +date -
          +currentDate -
          days * 60 * 60 * 24 * 1000 -
          hours * 60 * 60 * 1000
      ) /
        (60 * 1000)
    );
    let seconds = Math.floor(
      Math.floor(
        +date -
          +currentDate -
          days * 60 * 60 * 24 * 1000 -
          hours * 60 * 60 * 1000 -
          minutes * 60 * 1000
      ) / 1000
    );
    return (
      <div>
        {isParticipantsListWindowActive ? (
          <ParticipantsListWindow
            setParticipantsListWindowActive={setParticipantsListWindowActive}
            teamName={teamName}
            AsParticipants={true}
            isTeamCreator={isTeamCreator}
          />
        ) : (
          <div></div>
        )}
        <div className="Headers">
          <MainHeader setProfileWindowActive={setProfileWindowActive} />
          <QuestHeader
            setActionMenuOpen={setActionMenuOpen}
            setLeftPosition={setLeftPosition}
            setTopPosition={setTopPosition}
            participating={true}
            questName={questName}
          />
          <button
            className="exitToQuestButton"
            onClick={(e) => {
              navigate(-1);
            }}
          >
            <img
              className="exitToQuestButtonImage"
              src={`${process.env.PUBLIC_URL}/img/exitToMainButton.svg`}
              alt=""
            />
          </button>
        </div>
        {isActionMenuOpen ? (
          <ActionMenu
            setActionMenuOpen={setActionMenuOpen}
            typeOfActionMenu="Quest"
            leftPosition={leftPosition}
            topPosition={topPosition}
            setIsClarifyingWindowActive={setIsClarifyingWindowActive}
            setClarifyingWindowData={setClarifyingWindowData}
          />
        ) : (
          <div></div>
        )}
        {isProfileWindowActive ? (
          <ProfileWindow
            isProfileWindowActive={isProfileWindowActive}
            setProfileWindowActive={setProfileWindowActive}
          />
        ) : (
          <div></div>
        )}
        {
          <div>
            {isParticipantWindowActive ? (
              <ParticipantWindow
                typeOfParticipantWindow={typeOfParticipantWindow}
                setParticipantWindowActive={setParticipantWindowActive}
                setInCommand={setInCommand}
                setTeamName={setTeamName}
                setTeamCreator={setTeamCreator}
                teamName={teamName}
              />
            ) : (
              <div></div>
            )}
            <div hidden={startQuest} id="CounterQuestPage">
              {CountDown(days, hours, minutes, seconds)}
            </div>
            <div id="comandBlock">
              <div
                id="NotParticipantDescription"
                hidden={questType === 0 || isInCommand}
              >
                <div
                  hidden={questType === 0 || isInCommand}
                  id="createTeamDescription"
                >
                  Вам необходимо создать свою команду или присоединиться к уже
                  существующей
                </div>
                <div
                  hidden={questType === 0 || isInCommand}
                  id="notParticipantButtons"
                >
                  <button
                    hidden={questType === 0 || isInCommand}
                    onClick={(e) => {
                      setTypeOfParticipantWindow(0);
                      setParticipantWindowActive(true);
                    }}
                  >
                    Создать команду
                  </button>
                  <button
                    hidden={questType === 0 || isInCommand}
                    onClick={(e) => {
                      setTypeOfParticipantWindow(2);
                      setParticipantWindowActive(true);
                    }}
                  >
                    Присоединиться к команде
                  </button>
                </div>
              </div>
              <div hidden={!isInCommand} id="TeamDescription">
                <div hidden={!isInCommand}>Ваша команда:</div>
                <div hidden={!isInCommand}>
                  <div>{teamName}</div>
                  <img
                    onClick={(e) => {
                      setParticipantWindowActive(true);
                      setTypeOfParticipantWindow(1);
                    }}
                    hidden={!isInCommand}
                    src=""
                    alt="картинка"
                  />
                </div>
                <button
                  onClick={(e) => setParticipantsListWindowActive(true)}
                  hidden={!isInCommand}
                >
                  Список участников
                </button>
                {!isTeamCreator && isInCommand ? (
                  <button
                    onClick={(e) => {
                      setInCommand(false);
                      setTeamName("");
                    }}
                  >
                    Выйти
                  </button>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
            <div>{getCurrentTask()}</div>
          </div>
        }
      </div>
    );
  } else if (role === -1) {
    return (
      <div>
        {isClarifyingWindowActive ? (
          <ClarifyingWindow
            data={ClarifuyingWindowData}
            setIsClarifyingWindowActive={setIsClarifyingWindowActive}
            setBlockWindowActive={setBlockWindowActive}
          />
        ) : (
          <div></div>
        )}

        {isAddQuestWindowActive ? (
          <AddQuestWindow
            isAddQuestWindowActive={isAddQuestWindowActive}
            setAddQuestWindowActive={setAddQuestWindowActive}
            typeOfWindow={1}
          />
        ) : (
          <div></div>
        )}

        {isActionMenuOpen ? (
          <ActionMenu
            setActionMenuOpen={setActionMenuOpen}
            typeOfActionMenu="Quest"
            leftPosition={leftPosition}
            topPosition={topPosition}
            setIsClarifyingWindowActive={setIsClarifyingWindowActive}
            setClarifyingWindowData={setClarifyingWindowData}
            setAddQuestWindowActive={setAddQuestWindowActive}
          />
        ) : (
          <div></div>
        )}

        {isCreationTaskWindowActive ? (
          <TaskWindow
            typeOfWindow="creation"
            setTaskWindowActive={setCreationTaskWindowActive}
            useQuestData={useQuestData}
            currentCard={currentCard}
            actionMenuData={actionMenuData}
            tasks={tasks}
            setTasks={setTasks}
          />
        ) : (
          <div></div>
        )}

        {isSimpleTaskWindowActive ? (
          <TaskWindow
            setTaskWindowActive={setSimpleTaskWindowActive}
            typeOfWindow="simple"
            deleteId={deleteId}
            currentCard={currentCard}
            useQuestData={useQuestData}
            actionMenuData={actionMenuData}
            tasks={tasks}
            setTasks={setTasks}
          />
        ) : (
          <div></div>
        )}

        {isBlockWindowActive ? (
          <BlockWindow
            isBlockWindowActive={isBlockWindowActive}
            setBlockWindowActive={setBlockWindowActive}
            setCreationTaskWindowActive={setCreationTaskWindowActive}
            setSimpleTaskWindowActive={setSimpleTaskWindowActive}
            blockWindowID={blockWindowID}
            currentCard={currentCard}
            tasks={tasks}
            changetasks={setTasks}
            useQuestData={useQuestData}
            actionMenuData={actionMenuData}
            blocks={blocks}
            deleteId={deleteId}
            setDeleteID={setDeleteID}
            setBlocks={setBlocks}
            setIsClarifyingWindowActive={setIsClarifyingWindowActive}
            setClarifyingWindowData={setClarifyingWindowData}
          />
        ) : (
          <div></div>
        )}
        {isProfileWindowActive ? (
          <ProfileWindow
            isProfileWindowActive={isProfileWindowActive}
            setProfileWindowActive={setProfileWindowActive}
          />
        ) : (
          <div></div>
        )}
        {isParticipantsListWindowActive ? (
          <ParticipantsListWindow
            setParticipantsListWindowActive={setParticipantsListWindowActive}
            AsParticipants={false}
          />
        ) : (
          <div></div>
        )}
        <div className="Headers">
          <MainHeader setProfileWindowActive={setProfileWindowActive} />
          <QuestHeader
            setActionMenuOpen={setActionMenuOpen}
            setLeftPosition={setLeftPosition}
            setTopPosition={setTopPosition}
            participating={false}
            questName={questName}
          />
          <button
            className="exitToQuestButton"
            onClick={(e) => {
              navigate(-1);
            }}
          >
            <img
              className="exitToQuestButtonImage"
              src={`${process.env.PUBLIC_URL}/img/exitToMainButton.svg`}
              alt=""
            />
          </button>
        </div>
        <Blocks
          setBlockWindowID={setBlockWindowID}
          setactionMenuData={setactionMenuData}
          isBlockWindowActive={isBlockWindowActive}
          setBlockWindowActive={setBlockWindowActive}
          setSaveButtonActive={setSaveButtonActive}
          setBlocks={setBlocks}
          changeBlocks={changeBlocks}
          blocks={blocks}
          currentCard={currentCard}
          setCurrentCard={setCurrentCard}
        />
        <CreationBlocksMenu setCurrentCard={setCurrentCard} />
        <SaveBlockButton
          blocks={blocks}
          isSaveButtonActive={isSaveButtonActive}
          setSaveButtonActive={setSaveButtonActive}
        />
        <QuestFooter
          questName={questName}
          setParticipantsListWindowActive={setParticipantsListWindowActive}
        />
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default QuestPage;
