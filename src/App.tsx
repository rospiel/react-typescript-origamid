import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./Style.css"
import Header from "./components/Header";
import Sidenav from "./components/sidenav/Sidenav"
import { MainContextProvider } from "./contexts/MainContext";
import Summary from "./pages/Summary";

function App() {
  return (
    <div className='container'>
      <BrowserRouter>
        <MainContextProvider>
          <Sidenav />
          <main>
            <Header />
            <Routes>
              <Route path="/" element={<Summary />} />
            </Routes>
          </main>
        </MainContextProvider>
      </BrowserRouter>
    </div>
  )
}

export default App;
