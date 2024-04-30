import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './ProductPage.css';
import config from '../config';
import { useLocation } from 'react-router-dom';

export default function SellerProductPage() {
    const location = useLocation();
    const pid = location.state;

    const [counts, setCounts] = useState(null);
    setCounts(counts)
    const [purchasecount, setPurchaseCount] = useState(null);
    setPurchaseCount(purchasecount)
    const [data, setData] = useState([{}]);
    const [error, setError] = useState('');
    setError(error)
    const [message, setMessage] = useState('');

    const productpage = useCallback(async () => {
        try {
            const response = await axios.get(`${config.url}/getproductdetails/${pid}`);
            setData(response.data);
        } catch (error) {
            setError(error.response.data);
        }
    }, [pid]);

    const addedtocartcount = useCallback(async () => {
        try {
            const response = await axios.get(`${config.url}/addedtocartcount/${pid}`);
            setCounts(response.data);
        } catch (error) {
            setError('Failed to fetch counts');
        }
    }, [pid]);

    const purchasedcount = useCallback(async () => {
        try {
            const response = await axios.get(`${config.url}/purchasedcount/${pid}`);
            setPurchaseCount(response.data);
        } catch (error) {
            setError('Failed to fetch counts');
        }
    }, [pid]);

    useEffect(() => {
        productpage();
        addedtocartcount();
        purchasedcount();
    }, [productpage, addedtocartcount, purchasedcount]);

    setMessage(message);

    return (
        <div>
            {message ? <h4 align="center">{message}</h4> : null}

            <section className="product-details">
                <div className="product-img">
                    <div className="swiper mySwiper">
                        <div className="swiper-wrapper">
                            <div className="swiper-slide">
                                <img src={`${config.url}/productimage/${data[0].file}`} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <title>Product Page HTML</title>
                    {/* Rest of your JSX */}
                </div>
            </section>
        </div>
    );
}
