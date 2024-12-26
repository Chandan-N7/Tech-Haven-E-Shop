import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { addToCart } from '../../redux/slices/cartSlice';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { FadeLoader } from 'react-spinners';

const AllProducts = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.products);
    const [loading, setLoading] = useState(true)
    const cart = useSelector(state => state.cart.cart);

    const handleAddToCart = (product) => {
        dispatch(addToCart({ id: product.id, name: product.name, price: product.price, description: product.description, image: product.image, quantity: 1 }))
        toast.success("Add to cart")
    }
    useEffect(() => {
        if (products) {
            setLoading(false)
        }
    }, [])

    return (
        <div>
            <h3 className="text-3xl text-center my-10">All Products</h3>
            {
                loading ? (
                    <div className='w-[100%] h-[55vh] flex items-center justify-center'>
                        <FadeLoader color="#2bb200" />
                    </div>
                ) : (
                    <div className='grid grid-cols-1  gap-5 xl:grid-cols-4 md:grid-cols-3 md:gap-5 1xsm:grid-cols-2 1xsm:gap-3 xsm:grid-cols-1 1xsm:px-0 '>
                        {products.length === 0 ? (
                            <p>No products available</p>
                        ) : (
                            products.map((product) => (
                                <div key={product.id} className="p-4 bg-white overflow-hidden  w-[100%] hover:shadow-md rounded text-center">
                                    <div>
                                        <div className="">
                                            <Link to={`/product/${product.name}`} className="mx-auto bg-white ">
                                                <div className='overflow-hidden mb-2 '>
                                                    <img
                                                        src={product.image}
                                                        alt="product image"
                                                        className="mix-blend-multiply object-contain w-full  transition-transform duration-300 ease-in-out transform hover:scale-125"
                                                    />
                                                </div>
                                            </Link>
                                            <div className=" ">
                                                <Link to={`/product/${product.name}`} className='hover:text-red-600'>View Details</Link>
                                                <h2 className=" font-medium text-2xl mt-2 ">
                                                    {product.name}
                                                </h2>
                                                <div className="mt-2 flex gap-[5px] text-[0.8rem]">
                                                    <p className="text-slate-500 font-medium text-[1.1rem]  w-full">
                                                        {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(product.price)}
                                                    </p>
                                                </div>
                                                <button
                                                    className="font-semibold text-[1.2rem] text-center bg-[#2e8b57] text-white px-4 py-2 w-full rounded hover:bg-[#277649] mt-5"
                                                    onClick={() => handleAddToCart(product)}
                                                >
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )
            }
        </div>
    )
}

export default AllProducts
