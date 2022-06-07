import { useContext } from "react";
import TemasContext from "../context/TemasProvider";

const useTemas = () => {
    return useContext(TemasContext)
}

export default useTemas