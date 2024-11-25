import { useMainContext } from "../contexts/MainContext"

export default function Sidenav(): JSX.Element {
    const { data } = useMainContext()
    
    return (
        <aside className="mb">Sidenav</aside>
    )
}