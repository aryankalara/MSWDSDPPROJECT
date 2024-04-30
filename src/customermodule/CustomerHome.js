import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Product.css";
import products from './data';
import Card from './Card';
//import Product from './Product';
import ProductPage from "./ProductPage";
import { useNavigate } from 'react-router-dom';
import config from '../config'
import { BsFillBagFill } from "react-icons/bs";


export default function CustomerHome()
{
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${config.url}/viewcustomerproducts`);
      setProducts(response.data);
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

  const [product, setProduct] = useState({});
  const [error, setError] = useState('');

  const productpage = async (productid) => {
    try 
    {
      console.log("---")
      navigate('/productpage',{state : { param1: productid, param2: customerData.email}}   )
    } 
    catch (error) 
    {
      setError(error.response.data);
    }
  };





      
      return (
        <div>
        <section className="card-container" >
          {products.length > 0 ? (
  products.map((product, index) => (

<section className="card" onClick={() => productpage(product.productid)}>
        <img src={`${config.url}/productimage/${product.file}`} alt={"title"} className="card-img" />
        <div className="card-details">
          <p className="card-title">{product.productname}</p>
          <p align="left">Price</p>
          <section className="card-price">
            <div className="price">
              $<del style={{textDecoration:"line-through"}}>{product.prevprice}</del> {product.newprice}
            </div>
            <div className="bag">
              <BsFillBagFill className="bag-icon" />
            </div>
          </section>
        </div>
      </section>

    ))):(
      <div>No Data found</div>
    )
    
        }
        </section>
        </div>
      )
}

