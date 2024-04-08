import { useLocation, useNavigate, useParams } from "react-router-dom"
import MainPage from "../components/mainPage/MainPage"
import { useEffect, useState } from "react";

const Main = () => {
    const [checkedId, setCheckedId] = useState(false);
    const location = useLocation().pathname.split("/");
    const navigate = useNavigate();
    const userid = localStorage.getItem("id")
    return (
        <MainPage userid={userid}/>
    )
}

export default Main