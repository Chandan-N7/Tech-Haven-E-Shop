import React from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/slices/cartSlice';
import { toast } from 'react-toastify';

const Detail = ({ product }) => {
    const dispatch = useDispatch();
    const handleAddToCart = (product) => {
        dispatch(addToCart({ id: product.id, name: product.name, price: product.price, description: product.description, image: product.image, quantity: 1 }))
        toast.success("Add to cart")
    }

    return (
        <div className='px-2 py-5 mt-10 sm:px-10 1xsm:px-5'>
            <div className='flex flex-col gap-6 lg:flex-row'>
                <div className='w-full bg-slate-200 1xsm:w-96 1xsm:h-96'>
                    <img src={product?.image} alt="" className='w-full h-full object-contain mix-blend-multiply' />
                </div>
                <div>
                    <h3 className='text-2xl lg:text-4xl font-normal'>{product?.name}</h3>
                    <div className="flex items-center gap-2 text-2xl font- mt-2 lg:text-3xl">
                        <p className="text-red-600">
                            {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(product?.price)}
                        </p>
                    </div>
                    <div className="flex items-center gap-3 my-2">
                        <button className="border-2 border-[#2e8b57] rounded px-5 py-1 min-w-[100px] bg-[#2e8b57] text-white font-medium hover:bg-white hover:text-[#2e8b57] transition-all duration-300" onClick={() => handleAddToCart(product)}>
                            Add to Cart
                        </button>
                    </div>
                    <div>
                        <p className="text-slate-600 font-medium my-1">Description:</p>
                        <p>{product?.description}</p>
                    </div>
                    <div>
                        <p className="text-slate-600 font-medium my-1">Reviews:</p>
                        <ul className='list-disc pl-5'>
                            {product?.reviews.map((r, i) => (
                                <li key={i}>{r}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Detail
