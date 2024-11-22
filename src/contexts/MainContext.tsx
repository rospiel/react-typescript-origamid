import React from "react"
import useFetch from "../hooks/useFetch"
import { SaleDTO } from "../DTO/SaleDTO"

type MainContextProps = {
    data: SaleDTO[] | null
    loading: boolean
    error: string | null
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
    const { data, loading, error  } = useFetch<SaleDTO[]>("data/sales.json", { headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    } })

    return (
        <MainContext.Provider value={{ data, loading, error }}>
            {children}
        </MainContext.Provider>
    )
}