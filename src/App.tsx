import "./Style.css"
import Header from "./components/Header";
import Sidenav from "./components/Sidenav"
import Summary from "./pages/Summary";

function App() {
  return (
    <>
      <Sidenav />
      <main>
        <Header />
        <Summary />
      </main>
    </>
  )
}

export default App;
