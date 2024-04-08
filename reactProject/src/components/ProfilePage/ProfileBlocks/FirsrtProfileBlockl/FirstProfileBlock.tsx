import { useEffect, useState } from "react";
import "./FirstProfileBlock.css";
import { useParams } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";

const FirstProfileBlock = () => {
  const userid = localStorage.getItem("id")
  const { setAuth } = useAuth();

  const logout = async () => {
    const response = await fetch(
      "https://quests.projectswhynot.site/api/v1/user/logout",
      {
        method: "DELETE",
        body: JSON.stringify({ auth_token: userid }),
      }
    )
      .then((response) => response.json())
      .catch((error) => console.log(error));
    if (response.status === "OK") {
      setAuth(false);
      localStorage.clear()
      localStorage.setItem("auth", JSON.stringify(false));
      window.location.reload();
    }
  };
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    patronym: "",
    role: ""
  });
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://quests.projectswhynot.site/api/v1/user/user",
        {
          method: "POST",
          body: JSON.stringify({ auth_token: userid }),
        }
      )
        .then((response) => response.json())
        .catch((error) => console.log(error));
      if (response.status === "OK") {
        setData(response.message);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="FirstProfileBlock">
      <div>
        <div>{data.last_name}</div>
        <div>{data.first_name}</div>
        <div>{data.patronym}</div>
      </div>
      <div>
        <div>Роль:</div>
        <div>{data.role}</div>
      </div>
      <button onClick={async (e) => { await logout()}}>Выйти</button>
    </div>
  );
};

export default FirstProfileBlock;
