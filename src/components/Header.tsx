import React from "react"
import Months from "./Months"
import DateRange from "./dateRange/DateRange"

export default function Header(): JSX.Element {
    const [title, setTitle] = React.useState("Resumo")
    
    return (
        <header className='mb'>
            <div className='mb'>
                <DateRange />
                <h1 className="box bg-3">{title}</h1>
            </div>
            <Months />
        </header>
    )
}