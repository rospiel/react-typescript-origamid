import { useMainContext } from "../../contexts/MainContext"
import { dateToString, getMonthName } from "../../utils/dateUtils"
import { style } from "./ButtonMonthStyles"

type ButtonMonthProps = {
    numberMonth: number
}

export default function ButtonMonth({numberMonth}: ButtonMonthProps): JSX.Element {
    const { setStart, setEnd } = useMainContext()

    function setStartAndEnd(): void {
        const date = new Date();
        date.setMonth(date.getMonth() + numberMonth);
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  
        setStart(dateToString(firstDay));
        setEnd(dateToString(lastDay));
    }

    return (
        <button style={style} onClick={() => setStartAndEnd()}>{getMonthName(numberMonth)}</button>
    )

}