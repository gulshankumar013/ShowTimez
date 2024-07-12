import React, { useEffect, useState } from "react";
import { BsPlus } from "react-icons/bs";
import "../Dashbord/addmovieplaying.css";
import {useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import axios from "axios";


const FETCH_API = "http://localhost:5164/fetchAllMoviePlaying"; 
const DELETE_API = "http://localhost:5164/deleteMoviePlaying"; 

const Addmovieplaying = () => {
  //restrict this page if admin not login
//   const usenavigate = useNavigate();
//   useEffect(() => {
//     let email = sessionStorage.getItem("email");
//     if (email === "" || email === null) {
//       usenavigate("/adminLogin");
//     }
//   }, [usenavigate]);


  const [formData, setFormData] = useState({
    name: "",
    image: "",
    discription: ""
    
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      eventID: "1001",
      addInfo: {
        image: formData.image,
        name: formData.name,
        discription: formData.discription,
        
      },
    };
    try {
      const response = await axios.post("http://localhost:5164/upcomingMovie",payload);
      console.log(response.data, "api response"); // handle response
      toast.success('Card added successfully');
      fetchProduct()
      setFormData({
        name: "",
        image: "",
        discription: "",
       
      });
    } catch (error) {
      console.error("Error in adding card up:", error);
      // Handle error
    }
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({
        ...formData, image: reader.result,
      });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const navigateTo = (path) => {
    usenavigate(path);
  };

// this axios for fetching product with fetch api for Admin pannel
const [editingUser, setEditingUser] = useState(null);

  const [bestSellingProduct, setBestSellingProduct] = useState([]);
  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await axios.post(FETCH_API, { eventID: "1001" });
      console.log("API Response:", response.data); // Log the entire response
      if (response.status === 200) {
        const responseData = response.data;
        if (responseData.rData && responseData.rData.users) {
          setBestSellingProduct(responseData.rData.users);
          console.log("Users:", responseData.rData.users);
        } else {
          console.log("No users data in response");
        }
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // this axios for Deleting product with Delete api from Admin pannel
  const handleDelete = async (id) => {
    try {
      const response = await axios.post(DELETE_API, {
        eventID: "1001",
        addInfo: {
          id: id
        }
      });
      console.log("Delete Response:", response.data); // Log the entire response
      if (response.status === 200) {
        const responseData = response.data;
        if (responseData.rData.rMessage === "DELETE SUCCESSFULLY.") {
          toast.success("Product Deleted from Website")
          fetchProduct();
          setUsers(users.filter(user => user.id !== id)); // Remove user from local state
          console.log(`User with ID ${id} deleted successfully`);
        } else {
          console.log("Failed to delete user");
        }
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };


  return (
    <div className="product-page">
      
      <h2>Add Product in Best Selling</h2>
      <form className="product-form" onSubmit={handleSubmit}>
       
        <input
          type="file"
          onChange={handleImage}
        />
         <input
          type="text"
          placeholder="name"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
        />
        <input
          placeholder="Description"
          value={formData.discription}
          onChange={(e) =>
            setFormData({ ...formData, discription: e.target.value })
          }
        />
      
        <button type="submit">
          <BsPlus /> Add Product
        </button>
      </form>
      <h2>Product List</h2>

      <div className="form-container-a">
      <div className="table-container">
        <h3> Product list in Best selling page</h3>
        <div className="main-content">
          <table className="form-table">
            <thead>
              <tr>
                <th>PRODUCT IMAGE</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bestSellingProduct.length > 0 ? (
                bestSellingProduct.map((product) => (
                  <tr key={product.id}>
                    <td><img src={product.image} alt="" style={{height:"25px"}}/></td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>
                      <button onClick={() => handleEdit(product)}>Edit</button>
                      <button onClick={() => handleDelete(product.id)}>Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
          {editingUser && (
            <div className="edit-form">
              <h3>Edit Admin Details</h3>
              <form onSubmit={handleUpdate}>
                <div>
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={editFormData.name}
                    onChange={handleEditChange}
                  />
                </div>
                <div>
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={editFormData.email}
                    onChange={handleEditChange}
                  />
                </div>
                <div>
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    value={editFormData.password}
                    onChange={handleEditChange}
                  />
                </div>
                <button type="button" onClick={handleUpdate}>Update</button>
                <button type="button" onClick={() => setEditingUser(null)}>Cancel</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Addmovieplaying;