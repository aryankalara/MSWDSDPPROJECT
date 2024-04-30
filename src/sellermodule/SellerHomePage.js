import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Product.css";
import { useNavigate } from 'react-router-dom';
import config from '../config';
import { BsFillBagFill } from "react-icons/bs";

export default function SellerHomePage() {
  const [products, setProducts] = useState([]);
  const [sellerData, setSellerData] = useState("");

  useEffect(() => {
    const storedSellerData = localStorage.getItem('seller');
    if (storedSellerData) {
      const parsedSellerData = JSON.parse(storedSellerData);
      setSellerData(parsedSellerData);
    }
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${config.url}/viewsellerproducts/${sellerData.email}`);
        setProducts(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };
  
    fetchProducts();
  }, [sellerData.email]);
  
  

  const navigate = useNavigate();

  const productpage = async (productid) => {
    try {
      console.log(productid);
      navigate('/sellerproductpage', { state: productid });
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div>
      <h2>Your Products</h2>
      <section className="card-container">
        {products.length > 0 ? (
          products.map((product, index) => (
            <section className="card" key={index} onClick={() => productpage(product.productid)}>
              <img src={`${config.url}/productimage/${product.file}`} alt={"title"} className="card-img" />
              <div className="card-details">
                <p className="card-title">{product.productname}</p>
                <p align="left">Price</p>
                <section className="card-price">
                  <div className="price">
                    $<del style={{ textDecoration: "line-through" }}>{product.prevprice}</del> {product.newprice}
                  </div>
                  <div className="bag">
                    <BsFillBagFill className="bag-icon" />
                  </div>
                </section>
              </div>
            </section>
          ))
        ) : (
          <div>No Data found</div>
        )}
      </section>
    </div>
  );
}
