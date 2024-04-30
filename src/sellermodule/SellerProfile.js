import React, { useEffect, useState } from 'react';
import './profilepage.css'
// import config from '../config'
import { useNavigate } from 'react-router-dom';

export default function ViewCustomerProfile() {
  const [sellerData, setSellerData] = useState([]);
  useEffect(() => {
    const storedSellerData = localStorage.getItem('seller');
    if (storedSellerData) {
      const parsedSellerData = JSON.parse(storedSellerData);
      setSellerData(parsedSellerData)
    }
  }, []);

  const navigate = useNavigate();

  return (
    sellerData ? (
      <div className="profile-container">
        <h2>Your Profile</h2>
        <table>
          <tbody>
            <tr>
              <th>Full Name</th>
              <td>{sellerData.name}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{sellerData.email}</td>
            </tr>
            <tr>
              <th>Gender</th>
              <td>{sellerData.gender}</td>
            </tr>
            <tr>
              <th>Date of Birth</th>
              <td>{sellerData.dateofbirth}</td>
            </tr>
            <tr>
              <th>Contact</th>
              <td>{sellerData.contact}</td>
            </tr>
            <tr>
              <th>Company Name</th>
              <td>{sellerData.companyname}</td>
            </tr>
            <tr>
              <th>Location</th>
              <td>{sellerData.location}</td>
            </tr>
          </tbody>
        </table>
        <div className="update-link" onClick={() => navigate('/updatesellerprofile')}>
          Update?
        </div>
      </div>
    ) : (
      <p>No Seller Data Found</p>
    )
  );
}
