import NavBar from './components/pages/NavBar'
import Footer from './components/pages/Footer'
import Home from './components/pages/Home'
import "bootstrap/dist/css/bootstrap.min.css"

function App() {
  return(
    <>
      <header>
         <NavBar/>
      </header>
      <main>
        
        <Home/>
      </main>
      <footer>
        <Footer/>
      </footer>
    </>
  )
}

export default App
