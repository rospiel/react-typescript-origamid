import { useMainContext } from "../../contexts/MainContext"
import { MenuDTO } from "../../DTO/MenuDTO"
import useFetch from "../../hooks/useFetch"
import FintechSVG from '../../assets/FintechSVG';
import brandImg from '../../assets/fintech.svg';
import summaryIcon from '../../assets/icons/resumo.svg';
import salesIcon from '../../assets/icons/vendas.svg';
import webhooksIcon from '../../assets/icons/webhooks.svg';
import settingsIcon from '../../assets/icons/configuracoes.svg';
import contactUsIcon from '../../assets/icons/contato.svg';
import logOutIcon from '../../assets/icons/sair.svg';
import './sidenav.css'

export default function Sidenav(): JSX.Element {
    const { data } = useMainContext()
    const menu = searchMenu()
    const icons =  new Map<string, string>()
    setMapIcons(icons)
    

    function searchMenu(): MenuDTO[] {
        const { data } = useFetch<MenuDTO[]>("data/menu.json", 
            { headers: 
                {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                } 
            })

        return data!;            
    } 

    function setMapIcons(icons: Map<string, string>): void {
        icons.set("Summary", summaryIcon)
        icons.set("Sales", salesIcon)
        icons.set("Webhooks", webhooksIcon)
        icons.set("Settings", settingsIcon)
        icons.set("Contact us", contactUsIcon)
        icons.set("Log out", logOutIcon)
    }

    return (
        <nav className="sidenav box bg-3">
            <FintechSVG title="Fintech" />
            <ul>
                {menu?.map((option: MenuDTO, position: number) => (
                    <li key={position}>
                        <span>
                            <img src={icons.get(option.name)} alt={option.description} />
                        </span>
                        <a href="#">{option.name}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}