import { useLocation } from "react-router-dom";
import ViewContent from "../components/ViewPage/ViewContent";

const View = (props: any) => {
  const location = useLocation();
  return <ViewContent location={location}/>
};

export default View;
