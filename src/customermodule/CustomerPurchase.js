import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Product.css";
import { useNavigate } from 'react-router-dom';
import config from '../config'
import { BsFillBagFill } from "react-icons/bs";

export default function CustomerPurchase() {
  const [customerData, setCustomerData] = useState([]);
  let cemail = "";

  useEffect(() => {
    const storedCustomerData = localStorage.getItem('customer');
    if (storedCustomerData) {
      const parsedCustomerData = JSON.parse(storedCustomerData);
      setCustomerData(parsedCustomerData)
      cemail = parsedCustomerData.email
    }
  }, []);

  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      console.log(cemail)
      const response = await axios.get(`${config.url}/getpurchased/${cemail}`);
      console.log(response.data)
      setProducts(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const navigate = useNavigate();

  return (
    <div>
      <section className="card-container" >
        {products.length > 0 ? (
          products.map((product, index) => (
            <div key={product.productid} className="product-card">
              <img src={`${config.url}/productimage/${product.file}`} alt="Product Image"/>
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
