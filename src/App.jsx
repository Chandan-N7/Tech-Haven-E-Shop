import { useEffect } from 'react'
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setProduct } from './redux/slices/ProductSlice'
import ProductDetails from './pages/ProductDetails/ProductDetails';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import PageError from './pages/PageError/PageError';
import Search from './pages/Search/Search';

function App() {

  const dispatch = useDispatch();
  const products = useSelector(state => state.products.products)

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get('https://chandan-n7.github.io/product-api/db.json');
        if (response.status === 200) {
          dispatch(setProduct(response.data.products))
        }
      } catch (error) {
      }
    }
    getProducts();
  }, [])

  return (
    <div className='bg-slate-100'>
      <div className="max-w-[1400px] mx-auto px-3 py-3 ">
        <Router>
          <Navbar />
          <div className='w-full min-h-[90vh]'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path="/product/:productName" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="*" element={<PageError />} />
              <Route path="/search" element={<Search />} />
            </Routes>
          </div>
        </Router>
      </div>
    </div>
  )
}

export default App
