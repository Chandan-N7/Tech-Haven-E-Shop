import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { removeAllItems } from '../../redux/slices/cartSlice';

const Checkout = () => {
    const dispatcj = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const items = location.state;


    const [userDetails, setUserDetails] = useState({
        name: "",
        email: "",
        address: "",
        paymentDetails: "",
        upiId: "",
    });
    const validate = () => {
        if (!userDetails.name) {
            toast.error("Full Name is required")
            return false
        }
        if (!userDetails.email) {
            toast.error("Email is required")
            return false
        }
        if (!userDetails.address) {
            toast.error("Address is required")
            return false
        }
        if (!userDetails.paymentDetails) {
            toast.error("Payment Details is required")
            return false
        }
        if (userDetails.paymentDetails === "UPI" && !userDetails.upiId) {
            toast.error("UPI Id is required")
            return false
        }
        return true
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserDetails((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const handlePlaceOrder = () => {
        if (validate()) {
            toast.success("Order Success!");
            const userDetailsString = `
            Name: ${userDetails.name}
            Email: ${userDetails.email}
            Address: ${userDetails.address}
            Payment Method: ${userDetails.paymentDetails}
            ${userDetails.paymentDetails === "UPI" ? `UPI ID: ${userDetails.upiId}` : ""}
        `;
            alert(`Order Success!\n\nDetails:\n${userDetailsString}`);

            // Redirect to home page after alert
            navigate('/');
            dispatcj(removeAllItems);
        }
    }

    const totalPrice = items?.reduce(
        (sum, product) => sum + product.price * product.quantity,
        0
    );
    useEffect(() => {
        if (!items) {
            navigate("*")
        }
    })
    return (
        <div className='w-[95%] mx-auto bg-white my-10 rounded md:w-[70%]'>
            <h3 className='text-4xl font-semibold text-center py-5'>Checkout</h3>
            <div className='mt-5 w-[90%] mx-auto sm:w-[70%]'>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-xl font-medium text-gray-700">
                        Full Name:
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={userDetails.name}
                        onChange={handleInputChange}
                        required
                        autoComplete="off"
                    />
                </div>
                <div className="mb-4 ">
                    <label htmlFor="name" className="block text-xl font-medium text-gray-700">
                        Email:
                    </label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={userDetails.email}
                        onChange={handleInputChange}
                        required
                        autoComplete="off"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="address" className="block text-xl font-medium text-gray-700">
                        Address:
                    </label>
                    <textarea
                        id="address"
                        name="address"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={userDetails.address}
                        onChange={handleInputChange}
                        required
                        autoComplete="off"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="paymentDetails" className="block text-xl font-medium text-gray-700">
                        Payment Method:
                    </label>
                    <select
                        id="paymentDetails"
                        name="paymentDetails"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={userDetails.paymentDetails}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select Payment Method</option>
                        <option value="Cash">Cash</option>
                        <option value="UPI">UPI</option>
                    </select>
                </div>
                {
                    userDetails.paymentDetails === "UPI" &&
                    <div className="mb-4 ">
                        <label htmlFor="name" className="block text-xl font-medium text-gray-700">
                            Enter UPI ID:
                        </label>
                        <input
                            type="text"
                            id="email"
                            name="upiId"
                            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder='example@upi'
                            value={userDetails.upiId}
                            onChange={handleInputChange}
                            autoComplete="off"
                        />
                    </div>
                }

            </div>
            <div className='mt-5 w-[70%] mx-auto'>
                <h3 className='text-xl font-semibold '>Your Order</h3>
                <div>
                    {items && items?.map((item) => (
                        <div key={item.id} className='flex my-3 items-end gap-4'>
                            <div>
                                <img src={item.image} alt="" className='w-[50px]' />
                            </div>
                            <div>
                                <p>{item.name}</p>
                            </div>
                        </div>
                    ))}

                </div>
                <p className='text-[1.2rem] font-medium my-7'>Total : {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(totalPrice)}</p>
                <button className='font-semibold text-[1.2rem] text-center bg-blue-600 text-white px-4 py-2 w-full rounded hover:bg-blue-700 '
                    onClick={handlePlaceOrder}
                >Place Order</button>

            </div>
        </div>
    )
}

export default Checkout
