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

    function buildSection(title: string, totals: string): JSX.Element {
        return (
            <div className="box">
                <h2>{title}</h2>
                <span>
                    {totals}
                </span>
            </div>
        )

    }
    
    return (
        <section>
            <div className="resumo flex mb">
                {buildSection('Sales', summary.totalSales.toLocaleString(EN_US, USD))}
                {buildSection('Received', summary.totalReceived.toLocaleString(EN_US, USD))}
                {buildSection('Processing', summary.totalProcessing.toLocaleString(EN_US, USD))}
            </div>
            <div className="box">Gráficos</div>
        </section>
    )

}