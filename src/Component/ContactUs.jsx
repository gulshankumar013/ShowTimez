import React, { useState } from 'react'
import '../css/contactUs.css';
import { FaUser } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';
import Footer from './Footer';
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';




const ContactUs = () => {

    const[formData, setFormData]= useState({
        name:'',
        email:'',
        message:''
    });
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit =async(e) =>{
        e.preventDefault();
        const payload = {
                eventID: "1001",
                addInfo: {
                  name: formData.name,
                  email:formData.email,
                  message: formData.message
              }
        };
        try{
            const response = await axios.post('http://localhost:5164/contactUs',payload);
            console.log(response.data,'api response');
            if(response.data.rData.rMessage == "Request Added successfully")
                toast.success('  Queries has been send to customerCare', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                    });

            else{
                toast.info('  Queries already sended', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                    });
            }

            
        }catch(error){
            console.error('messege does not send due to some error:',error)
        }
    };
  return (
    <>
    <div className='contact-page'>
      
    <div className='contact-body'>
        <h1 className='contact-text'>We are Here to solve Your Query......   </h1>
        <h2 className='contact-text2'>Feel Free To Write us...</h2>
    <div className="contact-container">
       
        <div className="contactus-form">
            <h1>Contact us</h1>
            <form  action='#' method='post' onSubmit={handleSubmit}   className='contact-input'>
                <div className="contactus-input-container">
                    <span className="input-icon"><FaUser /></span>
                    <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required/>
                </div>
                <div className="contactus-input-container">
                    <span className="input-icon"><MdEmail/></span>
                    <input  type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required/>
                </div>
                <div className="contactus-input-container">
                    <textarea name="message" placeholder="Message" value={formData.message} onChange={handleChange} required></textarea>
                </div>
                <button className='contact-button' type="submit">Send Message</button>
            </form>
        </div>
        <div className="contact-image">
            <img src="contact.jpg" alt="" />
        </div>
    </div>
    </div>
    </div>
    <Footer/>
    </>
  )
}

export default ContactUs
