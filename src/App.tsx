import "./Style.css"
import Header from "./components/Header";
import Sidenav from "./components/Sidenav"
import { MainContextProvider } from "./contexts/MainContext";
import Summary from "./pages/Summary";

function App() {
  return (
    <>
      <MainContextProvider>
        <Sidenav />
        <main>
          <Header />
          <Summary />
        </main>
      </MainContextProvider>
    </>
  )
}

export default App;
