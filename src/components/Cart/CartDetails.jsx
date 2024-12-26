import React from 'react'
import { FiMinus, FiPlus } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { decreaseQuantity, increaseQuantity, remove } from '../../redux/slices/cartSlice';
import { Link, useNavigate } from 'react-router-dom';

const CartDetails = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartDetail = useSelector(state => state.cart.cart)

    const handleDecrease = (productId) => {
        dispatch(decreaseQuantity(productId));
    }
    const handleIncrese = (productId) => {
        dispatch(increaseQuantity(productId));
    }
    const handleRemove = (productId) => {
        dispatch(remove(productId))
    }
    const totalPrice = cartDetail.items.reduce(
        (sum, product) => sum + product.price * product.quantity,
        0
    );
    const handleCheckout = (cartDetail) => {
        if (cartDetail.items.length > 0) {
            navigate("/checkout", { state: cartDetail.items });
        }
    }

    return (
        <div className='flex flex-col gap-5 md:flex-row '>
            <div className='bg-white rounded shadow  my-5 w-[100%]'>
                {cartDetail.items.map((item) => (
                    <div key={item.id} className='my-5'>
                        <div className='flex flex-col  p-5 gap-5 xxsm:flex-row'>
                            <div>
                                <img src={item.image} alt="" />
                            </div>
                            <div>
                                <h2 className="text-2xl">{item.name}</h2>
                                <p className=" text-xl font-medium text-red-600">
                                    {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(item.price)}
                                </p>
                                <p className="mb-2 text-slate-600 text-[0.9rem] italic hover:text-red-600 cursor-pointer" onClick={() => { handleRemove(item.id) }}>Delete</p>
                                <div className="flex gap-1 ">
                                    <p>Qty:</p>
                                    <button
                                        className="p-[3px] rounded border-2 border-[#000] hover:bg-slate-200 disabled:border-slate-400 disabled:text-slate-400 disabled:cursor-not-allowed"
                                        disabled={item.quantity <= 1}
                                        onClick={() =>
                                            handleDecrease(item.id)
                                        }
                                    >
                                        <FiMinus />
                                    </button>
                                    <p className="mx-2">{item.quantity}</p>
                                    <button
                                        className="p-[3px] rounded border-2 border-[#000] hover:bg-slate-200 disabled:border-slate-400 disabled:text-slate-400 disabled:cursor-not-allowed"
                                        disabled={item.quantity >= 10}
                                        onClick={() => handleIncrese(item.id)}
                                    >
                                        <FiPlus />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <hr className='' />

                    </div>
                ))}
            </div>
            <div className='bg-white rounded shadow  my-5 w-[100%] p-5 xl:w-[30%] lg:w-[40%] md:w-[45%]'>
                <h3 className=' text-xl font-semibold'>Order Summary</h3>
                <p className='text-[1.2rem] font-medium my-7'>Total : {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(totalPrice)}</p>
                <button className='font-semibold text-[1.2rem] text-center bg-blue-600 text-white px-4 py-2 w-full rounded hover:bg-blue-700 '
                    onClick={() => handleCheckout(cartDetail)}
                >Proceed to Checkout</button>
            </div>
        </div>
    )
}

export default CartDetails
