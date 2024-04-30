import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductPage.css';
import config from '../config';
import { useLocation } from 'react-router-dom';

export default function AdminProductPage() {
    const location = useLocation();
    const pid = location.state;

    const [data, setData] = useState([{}]);
    setData(data)
    const [counts, setCounts] = useState(null);
    setCounts(counts)
    const [purchasecount, setPurchaseCount] = useState(null);
    setPurchaseCount(purchasecount)

    useEffect(() => {
        const productpage = async () => {
            try {
                const response = await axios.get(`${config.url}/getproductdetails/${pid}`);
                setData(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        const addedtocartcount = async () => {
            try {
                const response = await axios.get(`${config.url}/addedtocartcount/${pid}`);
                setCounts(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        const purchasedcount = async () => {
            try {
                const response = await axios.get(`${config.url}/purchasedcount/${pid}`);
                setPurchaseCount(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        productpage();
        addedtocartcount();
        purchasedcount();
    }, [pid]);

    return (
        <div>
            {/* Your JSX content */}
        </div>
    );
}
