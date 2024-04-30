import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../config'
export default function Login({onAdminLogin, onSellerLogin, onCustomerLogin}) 
{
      const [formData, setFormData] = useState({
        email: '',
        password: ''
      });
      const [message,setMessage] = useState("")
      const [error,setError] = useState("")
    
      const navigate = useNavigate();
    
      const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try 
        {
          let response = await axios.post(`${config.url}/checkadminlogin`, formData);
          if (response.data != null)
          {
            onAdminLogin();
    
            localStorage.setItem('admin', JSON.stringify(response.data));
    
            navigate("/adminhome");
          } 
          else 
          {
            response = await axios.post(`${config.url}/checksellerlogin`, formData);
            if (response.data != null)
            {
                onSellerLogin();
        
                localStorage.setItem('seller', JSON.stringify(response.data));
        
                navigate("/sellerhome");
            }
                    else 
                    {
                        response = await axios.post(`${config.url}/checkcustomerlogin`, formData);
                        if (response.data != null)
                        {
                            onCustomerLogin();
                    
                            localStorage.setItem('customer', JSON.stringify(response.data));
                    
                            navigate("/customerhome");
                        }
                            else
                            {
                                setMessage("Login Failed")
                                setError("")
                            }
                    }
          }

        } 
        catch (error) 
        {
          setMessage("")
          setError(error.message)
        }
      };

    

  

  return (
    <div>
      {
            message ? <h4 align="center">{message}</h4> : <h4 align="center" style={{color:"red"}}>{error}</h4>
      }



    <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.0/css/line.css"/>

    <link rel="stylesheet" href="style.css"/>
         
    <title>Login & Registration Form</title> 


    
    <div className="container">
        <div className="forms">
            <div className="form login" >
                <span className="title">Login</span>

                <form onSubmit={handleSubmit} >
                    <div className="input-field">
                        <input type="text" placeholder="Enter your email"  id="email" value={formData.username} onChange={handleChange} required />
                        <i className="uil uil-envelope icon"></i>
                    </div>
                    <div className="input-field">
                        <input type="password" className="password" placeholder="Enter your password" id="password" value={formData.password} onChange={handleChange} required />
                        <i className="uil uil-lock icon"></i>
                        <i className="uil uil-eye-slash showHidePw" ></i>
                    </div>

                    <div className="checkbox-text">
                        <div className="checkbox-content">
                            <input type="checkbox" id="logCheck"/>
                            <label htmlFor="logCheck" className="text">Remember me</label>
                        </div>
                        
                    </div>

                    <div className="input-field button" >
                    <input type="submit" value="Login"/>
                    </div>
                </form>





                <div className="login-signup">
                    <span className="text">Not a member?
                        <a href="/signup" className="text signup-link" >Signup Now</a>
                    </span>
                </div>
            </div>

           
        </div>
    </div>


    </div>
  )
}
