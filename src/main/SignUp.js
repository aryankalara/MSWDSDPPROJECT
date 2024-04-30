import React, { useState } from 'react';
import axios from 'axios';
import'./StyleShee.css'
import { useNavigate } from 'react-router-dom';
import config from '../config'

export default function SignUp() {

  const [formData, setFormData] = useState({
    name:'',
    email:'',
    gender:'',
    dateofbirth:'',
    contact:'',
    location:'',
    password: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

//   const navigate = useNavigate();

  const handleChange = (e) => 
  {
    
    setFormData({...formData, [e.target.id]: e.target.value});

  };

  const handleSubmit = async (e) => 
  {
    e.preventDefault();
    try 
    {
      const response = await axios.post(`${config.url}/insertcustomer`, formData);
      if (response.status === 200)
      {
        //It will set all fields to ""
        setFormData({
          name:'',
          email:'',
          gender:'',
          dateofbirth:'',
          contact:'',
          location:'',
          password: ''
        });
      }
      setMessage(response.data);
      setError(''); //set error to ""
    } 
    catch(error) 
    {
      setError(error.response.data);
      setMessage(''); //set message to ""
    }
  };





    // const change=() =>
    // {
    //     let container = document.querySelector(".container")
    //     let pwShowHide = document.querySelectorAll(".showHidePw")
    //     let pwFields = document.querySelectorAll(".password")
    //     let signUp = document.querySelector(".signup-link")
    //     let login = document.querySelector(".login-link")
      
    //       pwShowHide = document.querySelectorAll(".showHidePw")
    //       pwShowHide.forEach(eyeIcon =>{
    //           eyeIcon.addEventListener("click", ()=>{
    //               pwFields.forEach(pwField =>{
    //                   if(pwField.type ==="password"){
    //                       pwField.type = "text";
      
    //                       pwShowHide.forEach(icon =>{
    //                           icon.classList.replace("uil-eye-slash", "uil-eye");
    //                       })
    //                   }else{
    //                       pwField.type = "password";
      
    //                       pwShowHide.forEach(icon =>{
    //                           icon.classList.replace("uil-eye", "uil-eye-slash");
    //                       })
    //                   }
    //               }) 
    //           })
    //       })
    //           signUp.addEventListener("click", ( )=>{
    //           container.classList.add("active");
    //       });
    //       login.addEventListener("click", ( )=>{
    //           container.classList.remove("active");
    //       });
    // }
    

  

  return (
    <div>
      {
            message ? <h4 align="center">{message}</h4> : <h4 align="center" style={{color:"red"}}>{error}</h4>
      }


    <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.0/css/line.css"/>

    <link rel="stylesheet" href="style.css"/>
         
    <title>Login & Registration Form</title> 
    
    <div className="cont">
        <div className="forms">
   
            <div className="form login">
                <span className="title">Registration</span>
     
                <form onSubmit={handleSubmit}>
                    <div className="input-field">
                    <input type="text" id="name" value={formData.name}  placeholder="Enter you Name" onChange={handleChange} required />
                        <i className="uil uil-user"></i>
                    </div>

                    <div className="input-field">
                        <input type="email" id="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
                        <i className="uil uil-envelope icon"></i>
                    </div>

                    <div className="input-field">
                    <select id="gender" value={formData.gender} onChange={handleChange}  required>
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="others">Other</option>
                    </select>
                        <i className="uil uil-user"></i>
                    </div>

                    <div className="input-field">
                    <input type="date" id="dateofbirth" placeholder="Date of Birth" value={formData.dateofbirth} onChange={handleChange} required />
                        <i className="uil uil-user"></i>
                    </div>

                    <div className="input-field">
                        <input type="text" id="contact" pattern="[6789][0-9]{9}" value={formData.contact} placeholder="Enter your Contact" onChange={handleChange} required />
                        <i className="uil uil-phone"></i>
                    </div>

                    <div className="input-field">
                        <input type="text" id="location" value={formData.location} placeholder="Enter your Location" onChange={handleChange} required />
                        <i className="uil uil-user-location"></i>
                    </div>


                    <div className="input-field">
                        <input type="password" className="password" placeholder="Enter your password" id="password" value={formData.password} onChange={handleChange} required />
                        <i className="uil uil-lock icon"></i>
                        <i className="uil uil-eye-slash showHidePw"  ></i>
                    </div>

                    <div className="checkbox-text">
                        <div className="checkbox-content">
                            <input type="checkbox" id="termCon"/>
                            <label htmlFor="termCon" className="text">I accepted all terms and conditions</label>
                        </div>
                    </div>

                    <div className="input-field button">
                        <input type="submit" value="Signup"/>
                    </div>
                </form>

                <div className="login-signup">
                    <span className="text">Already a member?
                        <a href="#" className="text login-link">Login Now</a>
                    </span>
                </div>
            </div>
        </div>
    </div>
    </div>

  )
}
