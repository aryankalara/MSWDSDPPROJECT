import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Product.css";
import { useNavigate } from 'react-router-dom';
import config from '../config';
import { BsFillBagFill } from "react-icons/bs";

export default function CustomerPurchase() {
  const [sellerData, setSellerData] = useState([]);
  let semail = "";
  
  useEffect(() => {
    const storedSellerData = localStorage.getItem('seller');
    if (storedSellerData) {
      const parsedSellerData = JSON.parse(storedSellerData);
      setSellerData(parsedSellerData);
      semail = parsedSellerData.email;
    }
  }, []);

  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${config.url}/viewsellerproducts/${semail}`);
      setProducts(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const deletesellerproduct = async (productid, selleremail) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await axios.delete(`${config.url}/deletesellerproduct/${productid}/${selleremail}`);
        setMessage(response.data);
        navigate('/deleteproducts');
        await fetchProducts();
        setError('');
      } catch (error) {
        setError(error.response.data);
        setMessage('');
      }
    }
  }

  return (
    <div>
      <section className="card-container">
        {
          products.length > 0 ? (
            products.map((product, index) => (
              <div className="product-card" key={product.productid}>
                <img src={`${config.url}/productimage/${product.file}`} alt="Product Image"/>
                <div className="product-det">
                  <h2>{product.productname}</h2>
                  <p>{product.description}</p>
                </div>
                <div className="price-add-to-cart">
                  <p>&#8377;{product.newprice}</p>
                  <button onClick={() => deletesellerproduct(product.productid, sellerData.email)}>Delete</button>
                </div>
              </div>
            ))
          ) : (
            <div align="center">No Products are Purchased</div>
          )
        }
      </section>
    </div>
  )
}
