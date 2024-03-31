import { useLocation, useNavigate, useParams } from "react-router-dom"
import MainPage from "../components/mainPage/MainPage"
import { useEffect, useState } from "react";

const Main = () => {
    const [checkedId, setCheckedId] = useState(false);
    const location = useLocation().pathname.split("/");
    const navigate = useNavigate();
    useEffect(() => {
      if (
        localStorage.getItem("id") &&
        localStorage.getItem("id") !== null &&
        localStorage.getItem("id") !== "" &&
        userid !== localStorage.getItem("id")
      ) {
        let array = location;
        let id = localStorage.getItem("id");
        let index = location.indexOf("user");
        if (index !== -1 && id !== null) {
          array.splice(index + 1, 1, id);
          let stringURL = array.join("/");
          navigate(stringURL, { replace: true });
        }
      }
    }, [checkedId]);
    const { userid } = useParams()
    return (
        <MainPage userid={userid}/>
    )
}

export default Main