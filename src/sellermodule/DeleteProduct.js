import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Product.css";
import { useNavigate } from 'react-router-dom';
import config from '../config';

export default function CustomerPurchase() {
  const [sellerData, setSellerData] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedSellerData = localStorage.getItem('seller');
    if (storedSellerData) {
      const parsedSellerData = JSON.parse(storedSellerData);
      setSellerData(parsedSellerData);
      const semail = parsedSellerData.email;
      fetchProducts(semail);
    }
  }, []);

  const fetchProducts = async (semail) => {
    try {
      const response = await axios.get(`${config.url}/viewsellerproducts/${semail}`);
      setProducts(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteSellerProduct = async (productid, selleremail) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await axios.delete(`${config.url}/deletesellerproduct/${productid}/${selleremail}`);
        console.log(response.data);
        navigate('/deleteproducts');
        await fetchProducts(selleremail);
      } catch (error) {
        console.error(error.response.data);
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
                <img src={`${config.url}/productimage/${product.file}`} alt="Product"/>
                <div className="product-det">
                  <h2>{product.productname}</h2>
                  <p>{product.description}</p>
                </div>
                <div className="price-add-to-cart">
                  <p>&#8377;{product.newprice}</p>
                  <button onClick={() => deleteSellerProduct(product.productid, sellerData.email)}>Delete</button>
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
