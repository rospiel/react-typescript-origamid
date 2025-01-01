import "./Style.css"
import Header from "./components/Header";
import Sidenav from "./components/sidenav/Sidenav"
import { MainContextProvider } from "./contexts/MainContext";
import Summary from "./pages/Summary";

function App() {
  return (
    <div className='container'>
      <MainContextProvider>
        <Sidenav />
        <main>
          <Header />
          <Summary />
        </main>
      </MainContextProvider>
    </div>
  )
}

export default App;
