import './App.css'
import Home from './pages/Home'
import Product_Listing from './pages/Product_Listing'
import Product_Details from './pages/Product_Details'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Order_Confirmation from './pages/Order_Confirmation'
import NotFound from './pages/NotFound'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Product_Listing />} />
        <Route path='/products/:productId' element={<Product_Details />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/order-confirmation' element={<Order_Confirmation />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
