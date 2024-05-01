import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';
import './Comparisiontable.css';
import { useLocation } from 'react-router-dom';

export default function ProductPage() {
  const location = useLocation();
  const pid = location.state.param1;

  const [data, setData] = useState([]);

  useEffect(() => {
    const productpage = async () => {
      try {
        const response = await axios.get(`${config.url}/getproductdetails/${pid}`);
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    productpage();
  }, [pid]);

  return (
    <div>
      <section>
        {data.length > 0 && data[0].comparisionlink1 && data[0].comparisionlink2 ? (
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Product Price</th>
                <th>Comparison Link 1</th>
                <th>Comparison Link 2</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{data[0].productname}</td>
                <td>{data[0].newprice}</td>
                <td><a href={data[0].comparisionlink1} target="_blank" rel="noopener noreferrer">{data[0].comparisionlink1}</a></td>
                <td><a href={data[0].comparisionlink2} target="_blank" rel="noopener noreferrer">{data[0].comparisionlink2}</a></td>
              </tr>
            </tbody>
          </table>
        ) : (
          <div>No Data Found</div>
        )}
      </section>
    </div>
  );
}
