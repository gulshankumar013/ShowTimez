import React, { useEffect, useState } from "react";
import { BsPlus } from "react-icons/bs";
import "../Dashbord/addmovieplaying.css";
import {useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import axios from "axios";


// const FETCH_API = "http://localhost:5164/fetchAllMoviePlaying"; 
// const DELETE_API = "http://localhost:5164/deleteMoviePlaying"; 

const Addmovieplaying = () => {

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    discription: "",
        movie_time:"",
        castName1:"",
        castName2:"",
        castName3:"",
        castName4:"",
        castName5:"",
        castImage1:"",
        castImage2:"",
        castImage3:"",
        castImage4:"",
        castImage5:"",
        crewName1:"",
        crewName2:"",
        crewName3:"",
        crewImage1:"",
        crewImage2:"",
        crewImage3:"",
        aboutMovie:"",
    
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      eventID: "1001",
      addInfo: {
        image: formData.image,
        name: formData.name,
        discription: formData.discription,
        movie_time:formData.movie_time,
        castName1:formData.castName1,
        castName2:formData.castName2,
        castName3:formData.castName3,
        castName4:formData.castName4,
        castName5:formData.castName5,
        castImage1:formData.castImage1,
        castImage2:formData.castImage2,
        castImage3:formData.castImage3,
        castImage4:formData.castImage4,
        castImage5:formData.castImage5,
        crewName1:formData.crewName1,
        crewName2:formData.crewName2,
        crewName3:formData.crewName3,
        crewImage1:formData.crewImage1,
        crewImage2:formData.crewImage2,
        crewImage3:formData.crewImage3,
        aboutMovie:formData.aboutMovie,
      },
    };
    try {
      const response = await axios.post("http://localhost:5164/moviePlaying",payload);
      console.log(response.data, "api response"); 
      toast.success('Card added successfully');
      fetchProduct()
      setFormData({
        name: "",
        image: "",
        discription: "",
        movie_time:"",
        castName1:"",
        castName2:"",
        castName3:"",
        castName4:"",
        castName5:"",
        castImage1:"",
        castImage2:"",
        castImage3:"",
        castImage4:"",
        castImage5:"",
        crewName1:"",
        crewName2:"",
        crewName3:"",
        crewImage1:"",
        crewImage2:"",
        crewImage3:"",
        aboutMovie:"",

       
      });
    } catch (error) {
      console.error("Error in adding card up:", error);
    
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

  const castImage1 = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({
        ...formData, castImage1: reader.result,
      });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const castImage2 = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({
        ...formData, castImage2: reader.result,
      });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const castImage3 = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({
        ...formData, castImage3: reader.result,
      });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const castImage4 = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({
        ...formData, castImage4: reader.result,
      });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const castImage5 = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({
        ...formData, castImage5: reader.result,
      });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const crewImage1 = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({
        ...formData, crewImage1: reader.result,
      });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const crewImage2 = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({
        ...formData, crewImage2: reader.result,
      });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  
  const crewImage3 = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({
        ...formData, crewImage3: reader.result,
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
      console.log("API Response:", response.data); 
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
      console.log("Delete Response:", response.data); 
      if (response.status === 200) {
        const responseData = response.data;
        if (responseData.rData.rMessage === "DELETE SUCCESSFULLY.") {
          toast.success("Product Deleted from Website")
          fetchProduct();
          setUsers(users.filter(user => user.id !== id)); 
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
    <>
    <div className="product-page">
      <h2 className="page-title">Add Movie Now Playing</h2>
      <form className="product-form" onSubmit={handleSubmit}>
        <div className="form-content">
          <div className="form-pair">
            <input
              type="text"
              placeholder="Movie Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="input-field"
            />
            <input
              type="file"
              onChange={handleImage}
              className="file-input"
            />
          </div>
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="input-field description-field"
          />
          <input
            placeholder="Movie Time"
            value={formData.movie_time}
            onChange={(e) =>
              setFormData({ ...formData, movie_time: e.target.value })
            }
            className="input-field"
          />
          <div className="cast-crew-section">
            <div className="cast-crew-pair">
              <input
                type="file"
                onChange={castImage1}
                className="file-input"
              />
              <input
                placeholder="Cast Name1"
                value={formData.castName1}
                onChange={(e) =>
                  setFormData({ ...formData, castName1: e.target.value })
                }
                className="input-field"
              />
            </div>
            <div className="cast-crew-pair">
              <input
                type="file"
                onChange={castImage2}
                className="file-input"
              />
              <input
                placeholder="Cast Name2"
                value={formData.castName2}
                onChange={(e) =>
                  setFormData({ ...formData, castName2: e.target.value })
                }
                className="input-field"
              />
            </div>
            <div className="cast-crew-pair">
              <input
                type="file"
                onChange={castImage3}
                className="file-input"
              />
              <input
                placeholder="Cast Name3"
                value={formData.castName3}
                onChange={(e) =>
                  setFormData({ ...formData, castName3: e.target.value })
                }
                className="input-field"
              />
            </div>
            <div className="cast-crew-pair">
              <input
                type="file"
                onChange={castImage4}
                className="file-input"
              />
              <input
                placeholder="Cast Name4"
                value={formData.castName4}
                onChange={(e) =>
                  setFormData({ ...formData, castName4: e.target.value })
                }
                className="input-field"
              />
            </div>
            <div className="cast-crew-pair">
              <input
                type="file"
                onChange={castImage5}
                className="file-input"
              />
              <input
                placeholder="Cast Name5"
                value={formData.castName5}
                onChange={(e) =>
                  setFormData({ ...formData, castName5: e.target.value })
                }
                className="input-field"
              />
            </div>
            <div className="cast-crew-pair">
              <input
                type="file"
                onChange={crewImage1}
                className="file-input"
              />
              <input
                placeholder="Crew Name1"
                value={formData.crewName1}
                onChange={(e) =>
                  setFormData({ ...formData, crewName1: e.target.value })
                }
                className="input-field"
              />
            </div>
            <div className="cast-crew-pair">
              <input
                type="file"
                onChange={crewImage2}
                className="file-input"
              />
              <input
                placeholder="Crew Name2"
                value={formData.crewName2}
                onChange={(e) =>
                  setFormData({ ...formData, crewName2: e.target.value })
                }
                className="input-field"
              />
            </div>
            <div className="cast-crew-pair">
              <input
                type="file"
                onChange={crewImage3}
                className="file-input"
              />
              <input
                placeholder="Crew Name3"
                value={formData.crewName3}
                onChange={(e) =>
                  setFormData({ ...formData, crewName3: e.target.value })
                }
                className="input-field"
              />
            </div>
          </div>
          <textarea
            placeholder="About Movie"
            value={formData.aboutMovie}
            onChange={(e) =>
              setFormData({ ...formData, aboutMovie: e.target.value })
            }
            className="input-field description-field"
          />
        </div>
        <button type="submit" className="submit-button">
          <BsPlus /> Add Movie
        </button>
      </form>
    </div>
    </>
  );
};

export default Addmovieplaying;