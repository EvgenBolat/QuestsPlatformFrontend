import { useParams } from "react-router-dom"
import MainPage from "../components/mainPage/MainPage"

const Main = () => {
    const { userid } = useParams()
    return (
        <MainPage userid={userid}/>
    )
}

export default Main