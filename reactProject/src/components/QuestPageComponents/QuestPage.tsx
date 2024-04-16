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
import QRCode from "react-qr-code";

const QuestPage = () => {
  const [start_date, setStart_date] = useState("");
  const [isSaved, setSaved] = useState(true);
  const [isShaffled, setShaffled] = useState(false);
  const [end_time, setEndTime] = useState("");
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
      if (data.status === "OK") {
        if (data.message.role === -1) {
          setRole(-1);
          setBlocks(data.message.blocks_list);
          setQuestName(data.message.quest_name);
        } else if (data.message.role === 1) {
          setRole(1);
          setQuestName(data.message.quest_name);
          setStart_date(data.message.start_time);
          setEndTime(data.message.end_time);
          setNpcAnswer(data.message.npc_task.answer);
        } else if (data.message.role === 0) {
          setRole(0);
          setQuestType(data.message.quest_type);
          setQuestName(data.message.quest_name);
          setStart_date(data.message.start_time);
          setEndTime(data.message.end_time);
          setQuestData(data.message.blocks_list);
          if (data.message.quest_type === 1) {
            const data2 = await fetch(
              `https://quests.projectswhynot.site/api/v1/quests/${questid}/checkgroup`,
              {
                method: "POST",
                body: JSON.stringify({ auth_token: userid }),
              }
            )
              .then((responce) => responce.json())
              .catch((error) => console.log(error));
            if (data2.status === "OK") {
              setInCommand(true);
              setTeamName(data2.message.group.group_name);
              if (data2.message.group.leader_id === data2.message.user_id) {
                setTeamCreator(true);
              }
            } else if (data2.message === "Registrate first") {
              localStorage.clear();
              localStorage.setItem("auth", JSON.stringify(false));
              window.location.reload();
            }
          }
        }
      } else if (data.message === "Registrate first") {
        localStorage.clear();
        localStorage.setItem("auth", JSON.stringify(false));
        window.location.reload();
      }
    };
    fetchData();
  }, []);
  const location = useLocation();

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

  const [questType, setQuestType] = useState(-1);

  const [[d, h, m, s], setTime] = useState([0, 0, 0, 0]);
  const [paused, setPaused] = useState(false);
  const [over, setOver] = useState(false);

  useEffect(() => {
    if (role === 0 || role === 1) {
      let timeArray = start_date.split(" ")[1].split(":");
      let dateArray = start_date.split(" ")[0].split("-");
      let date = new Date(
        Number(dateArray[0]),
        Number(dateArray[1]) - 1,
        Number(dateArray[2]),
        Number(timeArray[0]),
        Number(timeArray[1])
      );
      let currentDate = new Date();
      let days = Math.trunc((+date - +currentDate) / (60 * 60 * 24 * 1000));
      if (days === -0) {
        days = 0;
      }
      let hours = Math.trunc(
        (+date - +currentDate - days * 60 * 60 * 24 * 1000) / (60 * 60 * 1000)
      );
      if (hours === -0) {
        hours = 0;
      }
      let minutes = Math.trunc(
        (+date -
          +currentDate -
          days * 60 * 60 * 24 * 1000 -
          hours * 60 * 60 * 1000) /
          (60 * 1000)
      );
      if (minutes === -0) {
        minutes = 0;
      }
      let seconds = Math.trunc(
        (+date -
          +currentDate -
          days * 60 * 60 * 24 * 1000 -
          hours * 60 * 60 * 1000 -
          minutes * 60 * 1000) /
          1000
      );
      if (seconds === -0) {
        seconds = 0;
      }
      setTime([days, hours, minutes, seconds]);
    }
  }, [start_date]);

  useEffect(() => {
    const timerID = setInterval(() => tick(d, h, m, s), 1000);
    return () => clearInterval(timerID);
  });

  const tick = (d: any, h: any, m: any, s: any) => {
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

  const [npcAnswer, setNpcAnswer] = useState("");

  useEffect(() => {
    if (d < 0 || h < 0 || m < 0 || s < 0) {
      setStartQuest(true);
    }
  }, [d, h, m, s]);

  const [questName, setQuestName] = useState("");
  const [role, setRole] = useState(-2);
  const [questData, setQuestData] = useState([
    {
      id: "",
      block_type: 0,
      block_name: "",
      block_num: 0,
      min_tasks: 0,
      vits: 0,
      tasks_list: [
        {
          id: "",
          task_type: 0,
          task_num: 0,
          user_progress: { status: 0, points: 0 },
          vital: false,
          description: "",
          question: "",
          answer: "",
          files: [],
          min_points: 1,
          max_points: 1,
          task_time: 30,
        },
      ],
    },
  ]);

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
        setQuestWasPasted(response.message);
        setQuestCompletedByAllPlayer(response.message);
      } else if (response.message === "Registrate first") {
        localStorage.clear();
        localStorage.setItem("auth", JSON.stringify(false));
        window.location.reload();
      }
    };
    fetchData();
  }, []);
  const defaultCard = { id: -1, order: -1, name: "", type: "parallel" };

  const [currentCard, setCurrentCard] = useState(defaultCard);

  const [tasks, setTasks] = useState([]);

  const [isAddQuestWindowActive, setAddQuestWindowActive] = useState(false);

  const [blocks, setBlocks] = useState([]);

  let changeBlocks: any = null;

  const [taskId, setTaskId] = useState("");

  const [actionMenuData, setactionMenuData] = useState(null);

  const changeTaskStatus = async (task_id: any, status: any, points: any) => {
    const response = await fetch(
      `https://quests.projectswhynot.site/api/v1/task/${task_id}/giveans`,
      {
        method: "POST",
        body: JSON.stringify({
          auth_token: userid,
          status: status,
          points: points,
        }),
      }
    )
      .then((response) => response.json())
      .catch((error) => console.log(error));
    if (response.message === "Registrate first") {
      localStorage.clear();
      localStorage.setItem("auth", JSON.stringify(false));
      window.location.reload();
    }
  };

  function useQuestData() {
    return [
      [taskId, setTaskId],
      [blockWindowID, setBlockWindowID],
    ];
  }

  const [isQuestCompletedByAllPlayers, setQuestCompletedByAllPlayer] =
    useState(false);

  const [typeOfParticipantWindow, setTypeOfParticipantWindow] = useState(0);
  const [isAnyTaskNoCompleted, setAnyTaskNoCompleted] = useState(false);
  const [startedAsking, setStartedAsking] = useState(false);

  const [isTasksOvered, setTasksOvered] = useState(false);

  const [isQuestWasPasted, setQuestWasPasted] = useState(false);

  useEffect(() => {
    let interlvalid = setInterval(() => {}, 1000000000000);
    if (!isQuestCompletedByAllPlayers && startedAsking) {
      interlvalid = setInterval(async () => {
        const response = await fetch(
          `https://quests.projectswhynot.site/api/v1/quests/${questid}/checkfinish`,
          {
            method: "GET",
          }
        )
          .then((response) => response.json())
          .catch((error) => console.log(error));
        if (response.status === "OK") {
          if (response.message === true) {
            setQuestCompletedByAllPlayer(true);
          }
        }
      }, 3000);
    }
    if (isQuestCompletedByAllPlayers) {
      clearInterval(interlvalid);
    }
  }, [startedAsking]);

  const [blockWindowID, setBlockWindowID] = useState(null);

  const [isInCommand, setInCommand] = useState(false);

  const getCurrentTask = () => {
    if (startQuest) {
      if (role === 1) {
        return (
          <div id="npcQRCode">
            <QRCode value={npcAnswer} />
          </div>
        );
      } else if (role === 0) {
        if (questType && !isInCommand) {
          navigate(`/user`);
          return;
        }
        let timeArray = end_time.split(" ")[1].split(":");
        let dateArray = end_time.split(" ")[0].split("-");
        let date = new Date(
          Number(dateArray[0]),
          Number(dateArray[1]) - 1,
          Number(dateArray[2]),
          Number(timeArray[0]),
          Number(timeArray[1])
        );
        let currentDate = new Date();
        if (currentDate > date) {
          let url = `/user/quest/${questid}/total`;
          navigate(url);
          return <div></div>;
        }
        for (let blockNum = 0; blockNum < questData.length; blockNum++) {
          for (
            let taskNum = 0;
            taskNum < questData[blockNum].tasks_list.length;
            taskNum++
          ) {
            if (
              questData[blockNum].tasks_list[taskNum].user_progress.status === 1
            ) {
              return (
                <div className="taskParticipating">
                  <TaskView
                    changeTaskStatus={changeTaskStatus}
                    blockId={questData[blockNum].id}
                    block_num={blockNum}
                    viewMode={false}
                    questData={questData}
                    data={questData[blockNum].tasks_list[taskNum]}
                    setQuestData={setQuestData}
                    setAnyTaskNoCompleted={setAnyTaskNoCompleted}
                    setQuestWasPasted={setQuestWasPasted}
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
            questData[blockNum].tasks_list.forEach(function (task: any) {
              if (task.vital) {
                countOfVital += 1;
                if (task.user_progress.status === 2) {
                  countOfCompletedVital += 1;
                }
              } else if (task.user_progress.status === 2) {
                countOfCompletedSimple += 1;
              }
            });
            if (
              countOfCompletedVital !== countOfVital
              // || countOfCompletedSimple !== questData[blockNum].min_tasks
            ) {
              return (
                <div className="taskParticipating">
                  <BlockView
                    setData={setQuestData}
                    questData={questData}
                    changeTaskStatus={changeTaskStatus}
                    remaining={
                      countOfCompletedSimple - questData[blockNum].min_tasks > 0
                        ? countOfCompletedSimple - questData[blockNum].min_tasks
                        : 0
                    }
                    viewMode={false}
                    length={questData[blockNum].tasks_list.length}
                    data={questData[blockNum]}
                    key={questData[blockNum].id}
                    blockId={questData[blockNum].id}
                    setQuestWasPasted={setQuestWasPasted}
                  />
                </div>
              );
            }
          } else {
            for (
              let taskNum = 0;
              taskNum < questData[blockNum].tasks_list.length;
              taskNum++
            ) {
              if (
                questData[blockNum].tasks_list[taskNum].user_progress.status ===
                  0 &&
                questData[blockNum].block_type === 0
              ) {
                changeTaskStatus(
                  questData[blockNum].tasks_list[taskNum].id,
                  1,
                  0
                );
                questData[blockNum].tasks_list[
                  taskNum
                ].user_progress.status = 1;
                setQuestData([...questData]);
                return <div></div>;
              }
            }
          }
        }
        if (!isQuestWasPasted) {
          return (
            <FinishScreen
              setQuestWasPasted={setQuestWasPasted}
              setStartedAsking={setStartedAsking}
              setAnyTaskNoCompleted={setAnyTaskNoCompleted}
              setTasksOvered={setTasksOvered}
            />
          );
        } else {
          if (!isQuestCompletedByAllPlayers) {
            return (
              <div id="waitingBody">
                <div>Ожидайте завершение квеста другими игроками</div>
                <div>Просим не обновляйть страницу</div>
              </div>
            );
          } else {
            if (questType === 1 && !isInCommand) {
              navigate(`/user`);
              return <div></div>;
            } else {
              let url = `/user/quest/${questid}/total`;
              navigate(url);
              return <div></div>;
            }
          }
        }
      } else {
        return <div></div>;
      }
    }
  };

  const [deleteId, setDeleteID] = useState("");

  const { questid } = useParams();
  const userid = localStorage.getItem("id");
  const navigate = useNavigate();

  const [isTeamCreator, setTeamCreator] = useState(false);
  const [teamName, setTeamName] = useState("");

  if (role === 0 || role === 1) {
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
          <MainHeader
            setProfileWindowActive={setProfileWindowActive}
            additionClass="quest"
          />
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
              draggable={false}
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
              {startQuest ? (
                <div></div>
              ) : (
                <div id="questStartDataCounter">
                  <div>До начала квеста осталось:</div>
                  {`${d.toString().padStart(2, "0")} д. ${h
                    .toString()
                    .padStart(2, "0")} ч. ${m
                    .toString()
                    .padStart(2, "0")} м. ${s.toString().padStart(2, "0")} с.`}
                </div>
              )}
            </div>
            <div id="comandBlock" hidden={role === 1}>
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
                    onClick={async (e) => {
                      const response = await fetch(
                        `https://quests.projectswhynot.site/api/v1/quests/${questid}/quitgroup`,
                        {
                          method: "DELETE",
                          body: JSON.stringify({
                            auth_token: userid,
                          }),
                        }
                      )
                        .then((response) => response.json())
                        .catch((error) => console.log(error));
                      if (response.status === "OK") {
                        setInCommand(false);
                        setTeamName("");
                      }
                      else if (response.message === "Registrate first") {
                        localStorage.clear();
                        localStorage.setItem("auth", JSON.stringify(false));
                        window.location.reload();
                      }
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
            setTasks={setTasks}
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
            isSaved={isSaved}
            isShaffled={isShaffled}
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
            setDeleteID={setDeleteID}
            setCurrentCard={setCurrentCard}
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
            setCurrentCard={setCurrentCard}
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
            isSaved={isSaved}
            isShaffled={isShaffled}
          />
        ) : (
          <div></div>
        )}
        {isParticipantsListWindowActive ? (
          <ParticipantsListWindow
            setParticipantsListWindowActive={setParticipantsListWindowActive}
            AsParticipants={false}
            isSaved={isSaved}
          />
        ) : (
          <div></div>
        )}
        <div className="Headers">
          <MainHeader
            setProfileWindowActive={setProfileWindowActive}
            additionClass="quest"
            isSaved={isSaved}
          />
          <QuestHeader
            setActionMenuOpen={setActionMenuOpen}
            setLeftPosition={setLeftPosition}
            setTopPosition={setTopPosition}
            participating={false}
            questName={questName}
            isSaved={isSaved}
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
          setShaffled={setShaffled}
          isShaffled={isShaffled}
          blocks={blocks}
          currentCard={currentCard}
          setCurrentCard={setCurrentCard}
          isSaved={isSaved}
          setSaved={setSaved}
        />
        <CreationBlocksMenu
          setCurrentCard={setCurrentCard}
          setSaved={setSaved}
          isShaffled={isShaffled}
          isSaved={isSaved}
        />
        <SaveBlockButton
          blocks={blocks}
          isSaveButtonActive={isSaveButtonActive}
          setSaveButtonActive={setSaveButtonActive}
          setSaved={setSaved}
          setShaffled={setShaffled}
        />
        <QuestFooter
          questName={questName}
          isSaved={isSaved}
          isShaffled={isShaffled}
          setParticipantsListWindowActive={setParticipantsListWindowActive}
        />
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default QuestPage;
