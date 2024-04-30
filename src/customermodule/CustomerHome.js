import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Product.css";
import { useNavigate } from 'react-router-dom';
import config from '../config'
import { BsFillBagFill } from "react-icons/bs";

export default function CustomerHome() {
  const [productsData, setProductsData] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${config.url}/viewcustomerproducts`);
      setProductsData(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const [customerData, setCustomerData] = useState("");

  useEffect(() => {
    const storedCustomerData = localStorage.getItem('customer');
    if (storedCustomerData) {
      const parsedCustomerData = JSON.parse(storedCustomerData);
      setCustomerData(parsedCustomerData)
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  const navigate = useNavigate();

  const productPage = async (productId) => {
    try {
      navigate('/productpage', { state: { param1: productId, param2: customerData.email } });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <section className="card-container">
        {productsData.length > 0 ? (
          productsData.map((product) => (
            <section className="card" key={product.productid} onClick={() => productPage(product.productid)}>
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
