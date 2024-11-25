import React from "react"
import useFetch from "../hooks/useFetch"
import { SaleDTO } from "../DTO/SaleDTO"

type MainContextProps = {
    data: SaleDTO[] | null | undefined
    loading: boolean
    error: string | null
    start: string;
    end: string;
    setStart: React.Dispatch<React.SetStateAction<string>>;
    setEnd: React.Dispatch<React.SetStateAction<string>>;
}

const MainContext = React.createContext<MainContextProps | null>(null)

export function useMainContext(): MainContextProps {
    const context = React.useContext(MainContext)

    if (!context) {
        throw new Error('useMainContext needs to be involved in MainContextProvider')
    }

    return context

}

export function MainContextProvider({children}: React.PropsWithChildren) {
    const [start, setStart] = React.useState<string>('');
    const [end, setEnd] = React.useState<string>('');

    function searchSales() {
        return useFetch<SaleDTO[]>("data/sales.json", 
            { headers: 
                {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                } 
            })
    }
    
    function searchSalesFiltered() {
        const { data, loading, error } = searchSales()
        const dateStart = new Date(start as string)
        const dateEnd = new Date(end as string)
        const filtered = data?.filter((sale) => {
            const date = new Date(sale.date.split(' ')[0])
            return date >= dateStart && date <= dateEnd
        })
        
        return { 
            data: hasData(filtered) ? null : filtered,
            loading, 
            error
        }
    }

    function isToFilter(): boolean {
        return start !== '' && end !== ''
    }

    function hasData(filtered: SaleDTO[] | undefined): boolean {
        return filtered === undefined || filtered.length === 0
    }
    
    const { data, loading, error } = isToFilter() ? searchSalesFiltered() : searchSales()

    return (
        <MainContext.Provider value={{ data, loading, error, start, setStart, end, setEnd }}>
            {children}
        </MainContext.Provider>
    )
}