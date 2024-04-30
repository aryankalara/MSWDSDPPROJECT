import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Product.css";
import { useNavigate } from 'react-router-dom';
import config from '../config';
import { BsFillBagFill } from "react-icons/bs";

export default function CustomerCart() {
  const [customerData, setCustomerData] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCustomerData = localStorage.getItem('customer');
    if (storedCustomerData) {
      const parsedCustomerData = JSON.parse(storedCustomerData);
      setCustomerData(parsedCustomerData);
      fetchProducts(parsedCustomerData.email); // Fetch products after setting customer data
    }
  }, []);

  const fetchProducts = async (cemail) => { // Moved cemail into the fetchProducts function
    try {
      console.log(cemail);
      const response = await axios.get(`${config.url}/getaddedtocart/${cemail}`);
      console.log(response.data);
      setProducts(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const productpage = async (productid) => {
    try {
      navigate('/productpage', { state: { param1: productid, param2: customerData.email } });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <section className="card-container" >
        {products.length > 0 ? (
          products.map((product, index) => (
            <section className="card" key={product.productid} onClick={() => productpage(product.productid)}>
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
          <div align="center">No Products are added to cart.</div>
        )}
      </section>
    </div>
  );
}
