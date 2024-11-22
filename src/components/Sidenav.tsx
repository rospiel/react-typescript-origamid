import React from "react"
import { useMainContext } from "../contexts/MainContext"

export default function Sidenav(): JSX.Element {
    const { data } = useMainContext()
    console.log(data)
    
    return (
        <aside>Sidenav</aside>
    )
}