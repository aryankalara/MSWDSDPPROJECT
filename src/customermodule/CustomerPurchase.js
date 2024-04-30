/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import "./Product.css";
import config from '../config';

export default function CustomerPurchase() {
  const [customerData, setCustomerData] = useState([]);
  setCustomerData(customerData)
  let cemailRef = useRef("");

  useEffect(() => {
    const storedCustomerData = localStorage.getItem('customer');
    if (storedCustomerData) {
      const parsedCustomerData = JSON.parse(storedCustomerData);
      setCustomerData(parsedCustomerData)
      cemailRef.current = parsedCustomerData.email;
    }
  }, []);

  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      console.log(cemailRef.current)
      const response = await axios.get(`${config.url}/getpurchased/${cemailRef.current}`);
      console.log(response.data)
      setProducts(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <section className="card-container" >
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.productid} className="product-card">
              <img src={`${config.url}/productimage/${product.file}`} alt={`Product: ${product.productname}`} />
              <div className="product-det">
                <h2>{product.productname}</h2>
                <p>{product.description}</p>
              </div>
              <div className="price-add-to-cart">
                <p>&#8377;{product.newprice}</p>
                <b>Purchased</b>
              </div>
            </div>
          ))
        ) : (
          <div align="center">No Products are Purchased</div>
        )}
      </section>
    </div>
  );
}
