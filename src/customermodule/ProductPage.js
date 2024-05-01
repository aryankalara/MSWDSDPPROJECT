import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './ProductPage.css'
import config from '../config';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ProductPage() {
    const location = useLocation();
    const pid = location.state.param1;
    const email = location.state.param2;
    const navigate = useNavigate();

    const [data, setData] = useState([{}]);
    const [customerData, setCustomerData] = useState("");
    const [message, setMessage] = useState('');
    const [serror, setSerror] = useState('');
    const [status, setStatus] = useState('');

    const productpage = useCallback(async () => {
        try {
            const response = await axios.get(`${config.url}/getproductdetails/${pid}`);
            setData(response.data);
        } catch (error) {
            console.log(error);
        }
    }, [pid]);

    useEffect(() => {
        productpage();
    }, [productpage]);

    useEffect(() => {
        const storedCustomerData = localStorage.getItem('customer');
        if (storedCustomerData) {
            const parsedCustomerData = JSON.parse(storedCustomerData);
            setCustomerData(parsedCustomerData)
        }
    }, []);

    const addtocart = async (productid, customeremail) => {
        try {
            const response = await axios.post(`${config.url}/addtocart`, { productid, customeremail });
            setMessage(response.data);
            setSerror('');
        } catch (error) {
            setSerror(error.response.data);
            setMessage('');
            console.log(serror)
        }
    }

    const productpurchase = async (productid, customeremail) => {
        try {
            const response = await axios.post(`${config.url}/productpurchase`, { productid, customeremail });
            setMessage(response.data);
            setSerror('');
        } catch (error) {
            setSerror(error.response.data);
            setMessage('');
        }
    }

    const removefromcart = async (productid, customeremail) => {
        if (window.confirm("Are you sure want to remove this product from cart?")) {
            try {
                const response = await axios.delete(`${config.url}/removefromcart/${productid}/${customeremail}`);
                setMessage(response.data);
                navigate('/cart');
                setSerror('');
            } catch (error) {
                setSerror(error.response.data);
                setMessage('');
            }
        }
    }

    const getcartstatus = async (productid, customeremail) => {
        try {
            const response = await axios.post(`${config.url}/getcartstatus`, { productid, customeremail });
            setStatus(response.data);
        } catch (error) {
            setSerror(error.response.data);
        }
    }

    useEffect(() => {
        getcartstatus(pid, email);
    }, [pid, email]);

    return (
        <div>
            {message ? <h4 align="center">{message}</h4> : null}
            <section className="product-details">
                <div className="product-img">
                    <img src={`${config.url}/productimage/${data[0].file}`} alt={data[0].productname} />
                </div>
                <div className="product-text">
                    <h3>{data[0].productname}</h3>
                    <span className="product-price">&#8377;{data[0].newprice}</span>
                    <p>{data[0].description}</p>
                    {status === 'Add to cart' ? (
                        <div className="product-button">
                            <div className="add-bag-btn" onClick={() => addtocart(data[0].productid, customerData.email)}>{status}</div>
                            <div className="add-bag-btn" onClick={() => productpurchase(data[0].productid, customerData.email)}>Purchase</div>
                        </div>
                    ) : (
                        <div className="product-button">
                            <div className="add-bag-btn" onClick={() => removefromcart(data[0].productid, customerData.email)}>Remove from Cart</div>
                            <div className="add-bag-btn" onClick={() => productpurchase(data[0].productid, customerData.email)}>Purchase</div>
                        </div>
                    )}
                    <div className="product-button">
                        <div className="add-bag-btn" onClick={() => navigate('/recommendproduct', { state: { param1: data[0].productname, param2: customerData.email } })}>Recommend</div>
                        <div className="add-bag-btn" onClick={() => navigate('/pricecomparision', { state: { param1: data[0].productid } })}>Price Compare</div>
                    </div>
                    <a href="/contact" className="help-btn">Need Any Help?</a>
                </div>
            </section>
        </div>
    )
}
