import React, { useEffect, useState } from "react"
import { useMainContext } from "../contexts/MainContext"
import { SaleStatusEnum } from "../enums/SaleStatusEnum"

type SummaryState = {
    totalSales: number
    totalReceived: number
    totalProcessing: number
}

function initialSummaryState(): SummaryState {
    return { totalSales: 0, totalReceived: 0, totalProcessing: 0 }
}

export default function Summary(): JSX.Element {
    const USD = { style: 'currency', currency: 'USD' }
    const EN_US = 'en-US'
    const operations = new Map<string, Function>()
    
    operations.set(SaleStatusEnum.PAID.valueOf(), (price: number) => {
        setSummary((prevState => ({
            ...prevState, 
            totalSales: prevState.totalSales + price,
            totalReceived: prevState.totalReceived + price
        })))

    })

    operations.set(SaleStatusEnum.PROCESSING.valueOf(), (price: number) => {
        setSummary((prevState => ({
            ...prevState, 
            totalSales: prevState.totalSales + price,
            totalProcessing: prevState.totalProcessing + price
        })))

    })

    operations.set(SaleStatusEnum.FAILED.valueOf(), (price: number) => {})

    const [summary, setSummary] = useState<SummaryState>(initialSummaryState())
    const { data } = useMainContext()
    
    useEffect(() => {
        data?.filter((info) => {
            operations.get(info.status.valueOf())!(info.price)
        })

        return () => setSummary(initialSummaryState())
    }, [data])
    
    return (
        <section>
            <div className="resumo flex mb">
                <div className="box">
                <h2>Sales</h2>
                <span>
                    {summary.totalSales.toLocaleString(EN_US, USD)}
                </span>
                </div>
                <div className="box">
                <div>
                    <h2>Received</h2>
                    <span>
                        {summary.totalReceived.toLocaleString(EN_US, USD)}
                    </span>
                </div>
                </div>
                <div className="box">
                <div>
                    <h2>Processing</h2>
                    <span>
                        {summary.totalProcessing.toLocaleString(EN_US, USD)}
                    </span>
                </div>
                </div>
            </div>
            <div className="box">Gráficos</div>
        </section>
    )

}