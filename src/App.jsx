
import './App.css'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/Footer'
function App() {

  return (
    <>
    <div className="bg-blue-50 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
    <Navbar/>
    <Manager/>
    <Footer/>

    </div>

    </>
  )
}

export default App
