import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Detail from '../../components/ProductDetail/Detail';

const ProductDetails = () => {
    const navigate = useNavigate();
    const { productName } = useParams();
    const products = useSelector((state) => state.products.products);
    const validate = products.find((product) => product.name === productName);

    useEffect(() => {
        if (products.length > 0) {
            const productExists = products.some(product => product.name === productName);
            if (!productExists) {
                navigate("*");
            }
        }
    }, [products, navigate, productName])
    return (
        <div className="">
            <Detail product={validate} />
        </div>
    )
}

export default ProductDetails
