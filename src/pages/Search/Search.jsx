import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { addToCart } from '../../redux/slices/cartSlice';
import { toast } from 'react-toastify';

const Search = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchParms] = useSearchParams();
    const [searchProduct, setSearchProduct] = useState("");
    const products = useSelector(state => state.products.products)
    const query = searchParms.get("q");

    const handleAddToCart = (product) => {
        dispatch(addToCart({ id: product.id, name: product.name, price: product.price, description: product.description, image: product.image, quantity: 1 }))
        toast.success("Add to cart")
    }

    useEffect(() => {
        const filteredItems = products.filter(item =>
            item.name.toLowerCase().includes(query.toLowerCase())
        );

        if (filteredItems) {
            setSearchProduct(filteredItems)
            console.log(filteredItems)

        } else {
            setSearchProduct("");
        }
    }, [query])
    useEffect(() => {
        if (searchParms.size === 0) {
            navigate('*')
        }
    }, [])
    console.log(searchProduct)
    return (
        <div className='mt-10 text-3xl font-semibold px-10'>
            <h2>{query}</h2>
            {searchProduct.length === 0 ? (
                <div className='flex justify-center'> Product not found</div>
            ) : (
                <div>
                    {searchProduct.map((item) => (
                        <div className='  mx-auto mt-5 w-full xxsm:w-[400px] ' key={item.id}>
                            <div>
                                <img src={item.image} alt="" className='w-full' />
                            </div>
                            <div className=" ">
                                <Link to={`/product/${item.name}`} className='hover:text-red-600 text-[1rem]'>View Details</Link>
                                <h2 className=" font-medium text-2xl mt-2 ">
                                    {item.name}
                                </h2>
                                <div className="mt-2 flex gap-[5px] text-[0.8rem]">
                                    <p className="text-slate-500 font-medium text-[1.1rem]  w-full">
                                        {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(item?.price)}
                                    </p>
                                </div>
                                <button
                                    className="font-semibold text-[1.2rem] text-center bg-[#2e8b57] text-white px-4 py-2  rounded hover:bg-[#277649] mt-5"
                                    onClick={() => handleAddToCart(item)}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Search
