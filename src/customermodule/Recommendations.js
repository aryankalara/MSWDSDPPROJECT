import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';
import './viewrecommendations.css';
import { useNavigate } from 'react-router-dom';

export default function ProductPage() {
  const [recommendations, setRecommendations] = useState([]);
  const [customerData, setCustomerData] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const storedCustomerData = localStorage.getItem('customer');
    if (storedCustomerData) {
      const parsedCustomerData = JSON.parse(storedCustomerData);
      setCustomerData(parsedCustomerData);
      const cemail = parsedCustomerData.email;
      fetchRecommendations(cemail);
    }
  }, []);

  const fetchRecommendations = async (cemail) => {
    try {
      const response = await axios.get(`${config.url}/viewrecommendations/${cemail}`);
      setRecommendations(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const toProductPage = async (productname) => {
    try {
      const response = await axios.get(`${config.url}/getproductdetailspname/${productname}`);
      navigate('/productpage', { state: { param1: response.data[0].productid, param2: customerData.email } });
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div>
      <section>
        {recommendations.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Recommendation From</th>
                <th>Product Name</th>
                <th>Message</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {recommendations.map((recommendation, index) => (
                <tr key={index}>
                  <td>{recommendation.fromemail}</td>
                  <td>{recommendation.productname}</td>
                  <td>{recommendation.text}</td>
                  <td><button onClick={() => toProductPage(recommendation.productname)}>View</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>No Recommendations</div>
        )}
      </section>
    </div>
  );
}
