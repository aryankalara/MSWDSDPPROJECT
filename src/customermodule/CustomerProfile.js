import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ViewCustomerProfile() {
  const [customerData, setCustomerData] = useState(null);

  useEffect(() => {
    const storedCustomerData = localStorage.getItem('customer');
    if (storedCustomerData) {
      const parsedCustomerData = JSON.parse(storedCustomerData);
      setCustomerData(parsedCustomerData);
    }
  }, []);

  const navigate = useNavigate();

  return (
    <div>
      {customerData ? (
        <div>
          <h2>Your Profile</h2>
          <table>
            <tbody>
              <tr>
                <th>Full Name</th>
                <td>{customerData.name}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{customerData.email}</td>
              </tr>
              <tr>
                <th>Gender</th>
                <td>{customerData.gender}</td>
              </tr>
              <tr>
                <th>Date of Birth</th>
                <td>{customerData.dateofbirth}</td>
              </tr>
              <tr>
                <th>Contact</th>
                <td>{customerData.contact}</td>
              </tr>
              <tr>
                <th>Location</th>
                <td>{customerData.location}</td>
              </tr>
            </tbody>
          </table>
          <div onClick={() => { navigate('/updatecustomerprofile') }}>
            Update?
          </div>
        </div>
      ) : (
        <p>No Customer Data Found</p>
      )}
    </div>
  );
}
