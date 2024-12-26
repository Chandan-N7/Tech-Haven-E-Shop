import React, { useState } from 'react'
import { FaCartShopping } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Navbar = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const cart = useSelector(state => state.cart.cart)
  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/search?q=${search}`);

    }
    setSearch("");
  };
  return (
    <div className=' px-3 py-3'>
      <div className="flex justify-between items-center  " >
        <div>
          <Link to={"/"}>
            <h1 className='text-3xl font-semibold'>Tech Haven</h1>
          </Link>
        </div>
        <div className=' items-center sm:flex hidden'>
          <input type="text" className='border border-slate-500 border-r-0 py-2 w-[300px] px-5 rounded-l-full' onChange={(e) => setSearch(e.target.value)} />
          <div className="border border-slate-500 h-[100%] py-3 px-5 rounded-r-full cursor-pointer hover:bg-slate-200" onClick={handleSearch} >
            <FaSearch onClick={handleSearch} />
          </div>
        </div>
        <Link to={"/cart"} className='relative'>
          <FaCartShopping className="text-2xl" />
          <p className="bg-[#2e8b57] text-white rounded-full px-1 h-[16px] text-[0.7rem] absolute top-[-6px] right-[-10px] flex items-center justify-center">
            {cart.items.length ? (
              cart.items.length
            ) : (0)}
          </p>
        </Link>
      </div>
      <div className='flex justify-center mt-5 sm:hidden'>
        <div className=' items-center flex w-[100%] '>
          <input type="text" className='border border-slate-500 border-r-0 py-2 w-[100%] px-5 rounded-l-full' onChange={(e) => setSearch(e.target.value)} />
          <div className="border border-slate-500 h-[100%] py-3 px-5 rounded-r-full cursor-pointer hover:bg-slate-200" onClick={handleSearch} >
            <FaSearch />
          </div>
        </div>
      </div>
    </div>

  )
}

export default Navbar
