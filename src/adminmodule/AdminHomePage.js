import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Product.css";
import { useNavigate } from 'react-router-dom';
import config from '../config'
import { BsFillBagFill } from "react-icons/bs";

export default function AdminHomePage() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${config.url}/viewcustomerproducts`);
      setProducts(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const productpage = async (productid) => {
    try {
      navigate('/adminproductpage', { state: productid });
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div>
      <section className="card-container">
        {products.length > 0 ? (
          products.map((product) => (
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
          <div>No Data found</div>
        )}
      </section>
    </div>
  );
}
