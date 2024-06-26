import { useEffect, useState } from "react";
import "./ParticipantsListWindowContent.css";
import { useParams } from "react-router-dom";

const ParticipantsListWindowContent = (props: any) => {
  const { questid } = useParams();
  const userid = localStorage.getItem("id")
  useEffect(() => {
    if (!props.AsParticipants) {
      const fetchData = async () => {
        const response = await fetch(
          `https://quests.projectswhynot.site/api/v1/quests/${questid}/participants`,
          {
            method: "POST",
            body: JSON.stringify({ auth_token: userid }),
          }
        )
          .then((response) => response.json())
          .catch((error) => console.log(error));
        if (response.status === "OK") {
          setData(response.message.participants);
        }
        else if (response.message === "Registrate first") {
          localStorage.clear();
          localStorage.setItem("auth", JSON.stringify(false));
          window.location.reload();
        }
      };
      fetchData();
    } else {
      const fetchData = async () => {
        const response = await fetch(
          `https://quests.projectswhynot.site/api/v1/quests/${questid}/groupparticipants`,
          {
            method: "POST",
            body: JSON.stringify({ auth_token: userid }),
          }
        )
          .then((response) => response.json())
          .catch((error) => console.log(error));
        if (response.status === "OK") {
          setData(response.message.participants);
          setLeaderId(response.message.user.id);
        }
        else if (response.message === "Registrate first") {
          localStorage.clear();
          localStorage.setItem("auth", JSON.stringify(false));
          window.location.reload();
        }
      };
      fetchData();
    }
  }, []);

  const [teamLeaderId, setLeaderId] = useState("");
  const [data, setData] = useState([
    { first_name: "-1", second_name: "", patronym: "", default: true },
  ]);

  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    setBlockData(buildParticipants())
  },[data]);

  const [blockData, setBlockData] = useState(buildParticipants());

  function buildParticipants() {
    let counter = 0;
    let newData =
      data.length && data.length > 0 ? (
        data[0].first_name === "-1" ? (
          <div></div>
        ) : (
          data.map((elem: any) => {
            return (
              <div id="participantsElement" key={++counter}>
                <div id="ParticipantsInfo">
                  {elem.last_name} {elem.first_name}
                </div>
                {!props.AsParticipants ||
                (props.AsParticipants && props.isTeamCreator) ? (
                  !props.AsParticipants ||
                  (props.AsParticipants &&
                    props.isTeamCreator &&
                    !elem.is_creator) ? (
                    <img
                      id="deleteParticipantButton"
                      onClick={() => {
                        if (!props.AsParticipants) {
                          const fetchData = async () => {
                            const response = await fetch(
                              `https://quests.projectswhynot.site/api/v1/quests/${questid}/removeparticipant/${elem.id}`,
                              {
                                method: "DELETE",
                                body: JSON.stringify({ auth_token: userid }),
                              }
                            )
                              .then((response) => response.json())
                              .catch((error) => console.log(error));
                            if (response.status === "OK") {
                              let index = data.findIndex(
                                (el: any) => el.id === elem.id
                              );
                              data.splice(index, 1);
                              let newData = data;
                              setData(newData);
                              setClicked(true);
                            }
                            else if (response.message === "Registrate first") {
                              localStorage.clear();
                              localStorage.setItem("auth", JSON.stringify(false));
                              window.location.reload();
                            }
                          };
                          fetchData();
                        }
                        if (props.AsParticipants && props.isTeamCreator) {
                          const fetchData = async () => {
                            const response = await fetch(
                              `https://quests.projectswhynot.site/api/v1/quests/${questid}/removefromgroup`,
                              {
                                method: "DELETE",
                                body: JSON.stringify({
                                  auth_token: userid,
                                  user_id: elem.id,
                                }),
                              }
                            )
                              .then((response) => response.json())
                              .catch((error) => console.log(error));
                            if (response.status === "OK") {
                              let index = data.findIndex(
                                (el: any) => el.id === elem.id
                              );
                              data.splice(index, 1);
                              let newData = data;
                              setData(newData);
                              setClicked(true);
                            }
                            else if (response.message === "Registrate first") {
                              localStorage.clear();
                              localStorage.setItem("auth", JSON.stringify(false));
                              window.location.reload();
                            }
                          };
                          fetchData();
                        }
                      }}
                      src={`${process.env.PUBLIC_URL}/img/ExitButton.svg`}
                      alt=""
                    />
                  ) : (
                    <div id="deleteParticipantButton"></div>
                  )
                ) : (
                  <div id="deleteParticipantButton"></div>
                )}
              </div>
            );
          })
        )
      ) : (
        <div></div>
      );
    return newData;
  }

  useEffect(() => {
    setBlockData(buildParticipants());
    setClicked(false);
  }, [clicked]);
  return (
    <div id="ParticipantsListWindowContent">
      <div id="ParticipantsListHeader">Список участников</div>
      <div id="ParticipantsList">{blockData}</div>
    </div>
  );
};

export default ParticipantsListWindowContent;
