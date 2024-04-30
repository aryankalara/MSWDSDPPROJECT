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
    setSerror(serror)
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
        } else {
            productpage();
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
            <section class="product-details">
                <div class="product-img">
                    <img src={`${config.url}/productimage/${data[0].file}`} alt={data[0].productname} />
                </div>
                <div class="product-text">
                    <h3>{data[0].productname}</h3>
                    <span class="product-price">&#8377;{data[0].newprice}</span>
                    <p>{data[0].description}</p>
                    {status === 'Add to cart' ? (
                        <div class="product-button">
                            <div class="add-bag-btn" onClick={() => addtocart(data[0].productid, customerData.email)}>{status}</div>
                            <div class="add-bag-btn" onClick={() => productpurchase(data[0].productid, customerData.email)}>Purchase</div>
                        </div>
                    ) : (
                        <div class="product-button">
                            <div class="add-bag-btn" onClick={() => removefromcart(data[0].productid, customerData.email)}>Remove from Cart</div>
                            <div class="add-bag-btn" onClick={() => productpurchase(data[0].productid, customerData.email)}>Purchase</div>
                        </div>
                    )}
                    <div class="product-button">
                        <div class="add-bag-btn" onClick={() => navigate('/recommendproduct', { state: { param1: data[0].productname, param2: customerData.email } })}>Recommend</div>
                        <div class="add-bag-btn" onClick={() => navigate('/pricecomparision', { state: { param1: data[0].productid } })}>Price Compare</div>
                    </div>
                    <a href="/contact" class="help-btn">Need Any Help?</a>
                </div>
            </section>
        </div>
    )
}
