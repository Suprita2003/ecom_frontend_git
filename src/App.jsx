import './App.css'
import { createBrowserRouter,createRoutesFromElements,Route,Routes,RouterProvider, BrowserRouter } from 'react-router-dom'
import Home from './Main/Home/Home'
import Dashboard from './Dashboard'
import Cart from './Pages/Cart/Cart'
import Navbar from './Main/Navbar/Navbar'

function App() {

  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path='/cart' element={<Cart/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
