import axios from 'axios';
import React, { useState } from 'react'
import { BsPlus } from 'react-icons/bs';
import { toast } from 'react-toastify';

const AddComingMovie = () => {

    const [formData, setFormData] = useState({
        name: "",
        image: "",
        discription: "",
           
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
          console.log(response.data, "api response"); 
          toast.success('Card added successfully');
          
          setFormData({
            name: "",
            image: "",
            discription: "",
           
           
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
          
        </div>
        <button type="submit" className="submit-button">
          <BsPlus /> Add Movie
        </button>
      </form>
    </div>
    </>
  )
}

export default AddComingMovie;
