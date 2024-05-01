import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Product.css";
import config from '../config';

export default function CustomerPurchase() {
  const [customerEmail, setCustomerEmail] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedCustomerData = localStorage.getItem('customer');
    if (storedCustomerData) {
      const parsedCustomerData = JSON.parse(storedCustomerData);
      setCustomerEmail(parsedCustomerData.email);
    }
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (customerEmail) {
          const response = await axios.get(`${config.url}/getpurchased/${customerEmail}`);
          setProducts(response.data);
        }
      } catch (error) {
        console.error(error); // Log error for debugging
      }
    };

    fetchProducts();
  }, [customerEmail]);

  return (
    <div>
      <section className="card-container">
        {products.length > 0 ? (
          products.map((product, index) => (
            <div className="product-card" key={index}>
              <img src={`${config.url}/productimage/${product.file}`} alt={`Product ${product.productname}`} />
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
