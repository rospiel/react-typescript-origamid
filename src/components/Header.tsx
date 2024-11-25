import Months from "./Months"
import DateRange from "./dateRange/DateRange"

export default function Header(): JSX.Element {
    return (
        <header className='mb'>
            <div className='mb'>
                <DateRange />
            </div>
            <Months />
        </header>
    )
}