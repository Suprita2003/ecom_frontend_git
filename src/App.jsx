import './App.css'
import { createBrowserRouter,createRoutesFromElements,Route,Routes,RouterProvider, BrowserRouter } from 'react-router-dom'
import Home from './Main/Home/Home'
import Dashboard from './Dashboard'
import Cart from './Pages/Cart/Cart'
import Navbar from './Main/Navbar/Navbar'
import Orders from './Pages/Orders/Orders'
import SingleProduct from './Pages/Singleproduct/Singleproduct'

function App() {

  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
          <Route path='/home' element={<Home/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/order' element={<Orders/>}/>
          <Route path="/product/:productId" element={<SingleProduct/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
