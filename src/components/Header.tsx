import React from "react"
import Months from "./Months"
import DateRange from "./dateRange/DateRange"

export default function Header(): JSX.Element {
    const [title, setTitle] = React.useState("Summary")
    
    return (
        <header className='mb'>
            <div className='daterange mb'>
                <DateRange />
                <h1 className="box bg-3">{title}</h1>
            </div>
            <Months />
        </header>
    )
}