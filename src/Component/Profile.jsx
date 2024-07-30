import React, { useEffect, useState } from "react";
import "../css/profile.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import MyBookings from "./MyBookings";
import { FaUpload } from "react-icons/fa";
import Footer from "./Footer";
import Giftcard from "./Giftcard";

const UPDATE_API = "http://localhost:5165/update";

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [fetchedImage, setFetchedImage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newMobile, setNewMobile] = useState("");
  const [newProfile, setNewProfile] = useState({ profile: "" });
  const [newPassword, setNewPassword] = useState("");
  const [newName, setNewName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [isLogoutPopupVisible, setIsLogoutPopupVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Personal Details");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem("userData"));
    if (!data) {
      navigate("/login");
    } else {
      setUserData(data);
      if (data.profileImage) {
        setProfileImage(data.profileImage);
      }
    }
  }, [navigate]);

  useEffect(() => {
    fetchProfileImage();
  }, [fetchedImage]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setProfileImage(file);
        setNewProfile({
          ...newProfile,
          profile: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditButtonClick = () => {
    setIsEditing(true);
    setNewEmail(userData.email || "");
    setNewMobile(userData.mobile || "");
    setNewProfile(userData.profile || "");
    setNewPassword(userData.password || "");
    setNewName(userData.name || "");
  };

  const handleSave = async () => {
    const updatedUserData = {
      ...userData,
      name: newName,
      email: newEmail,
      password: newPassword,
      mobile: newMobile,
    };

    if (profileImage) {
      const formData = new FormData();
      formData.append("profileImage", profileImage);
      formData.append("userData", JSON.stringify(updatedUserData));

      try {
        const response = await axios.post(UPDATE_API, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 200) {
          setUserData(updatedUserData);
          sessionStorage.setItem("userData", JSON.stringify(updatedUserData));
          setIsEditing(false);
          toast.success("Profile updated successfully");
        } else {
          toast.error("Failed to update profile");
        }
      } catch (error) {
        console.error("Error updating profile:", error);
        toast.error("An error occurred while updating the profile");
      }
    } else {
      try {
        const response = await axios.post(UPDATE_API, updatedUserData);

        if (response.status === 200) {
          setUserData(updatedUserData);
          sessionStorage.setItem("userData", JSON.stringify(updatedUserData));
          setIsEditing(false);
          toast.success("Profile updated successfully");
        } else {
          toast.error("Failed to update profile");
        }
      } catch (error) {
        console.error("Error updating profile:", error);
        toast.error("An error occurred while updating the profile");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      eventID: "1001",
      addInfo: {
        id: userData.id,
        name: newName,
        email: newEmail,
        password: newPassword,
        mobile: newMobile,
      },
    };

    try {
      const response = await axios.post("http://localhost:5165/update", payload);
      console.log(response.data, "api response");
      toast.success("Profile Updated");
    } catch (error) {
      console.error("Error in updating profile:", error);
      toast.error("Error in updating profile");
    }
  };

  const handleProfileImage = async (e) => {
    e.preventDefault();
    const payload = {
      eventID: "1001",
      addInfo: {
        id: userData.id,
        profile: newProfile.profile,
      },
    };

    try {
      const response = await axios.post("http://localhost:5165/updateProfileImage", payload);
      toast.success("Image added successfully");
      fetchProfileImage();
    } catch (error) {
      console.error("Error in adding profile image:", error);
      toast.error("Error in adding profile image");
    }
  };

  const fetchProfileImage = async () => {
    const payload = {
      eventID: "1001",
      addInfo: {
        id: userData.id,
      },
    };

    try {
      const response = await axios.post("http://localhost:5165/fetchProfileImage", payload);
      setFetchedImage(response.data.rData.profile);
      setPreviewImage(response.data.rData.profile);
    } catch (error) {
      console.error("Error in fetching profile image:", error);
      toast.error("Error in fetching profile image");
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  const showLogoutPopup = () => {
    setIsLogoutPopupVisible(true);
  };

  const hideLogoutPopup = () => {
    setIsLogoutPopupVisible(false);
  };

  const confirmLogout = () => {
    hideLogoutPopup();
    handleLogout();
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case "Personal Details":
        return (
          <div>
            <h2>Contact Information</h2>
            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Name</label>
                  <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Enter new name" />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="text" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder="Enter new email" />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input type={showPassword ? "text" : "password"} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Enter new password" />
                  <span onClick={togglePasswordVisibility}>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
                <div className="form-group">
                  <label>Mobile No</label>
                  <input type="text" value={newMobile} onChange={(e) => setNewMobile(e.target.value)} placeholder="Enter new mobile no" />
                </div>
                <div className="form-group">
                  <label>Profile Image</label>
                  <input type="file" onChange={handleImageChange} />
                </div>
                <button type="button" onClick={handleSave}>Save</button>
              </form>
            ) : (
              <div>
                <p className="profile-detail">
                  <span className="profile-label">Name:</span> {userData.name}
                </p>
                <p className="profile-detail">
                  <span className="profile-label">Email:</span> {userData.email}
                </p>
                <p className="profile-detail">
                  <span className="profile-label">Mobile No:</span> {userData.mobile}
                </p>
                <p className="profile-detail">
                  <span className="profile-label">Gender:</span> {userData.gender}
                </p>
                <p className="profile-detail">
                  <span className="profile-label">Date of Birth:</span> {userData.date_of_Birth}
                </p>
                <button className="profile-button" onClick={handleEditButtonClick}>Edit</button>
              </div>
            )}
          </div>
        );
      case "My Bookings":
        return <MyBookings/>;
      case "Movie Alerts":
        return <div>Movie Alerts content goes here.</div>;
      case "Preferences":
        return <div>Preferences content goes here.</div>;
      case "Saved Cards":
        return <div>Saved Cards content goes here.</div>;
      case " Redeem Gift Card ":
        return <Giftcard />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="profile-page">
        <div className="profile-header">
          <div className="profile-header-left">
            
            <div className="profile-avatar" style={{ backgroundImage: previewImage ? `url(${previewImage})` : 'url("defaultprofile.jpg")' }}>
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </div>
            
            <div className="profile-info">
              <h1>{userData.name}</h1>
              <p>{userData.email}</p>
              <p>{userData.mobile}</p>
            </div>
            <div onClick={handleProfileImage} className="profile-upload-image" ><FaUpload size={"20px"}/></div>
         
          </div>
          
          
        </div>
        <div className="profile-content">
          <div className="profile-sidebar">
            <ul>
              <li className={selectedTab === "Personal Details" ? "active" : ""} onClick={() => setSelectedTab("Personal Details")}>Personal Details</li>
              <li className={selectedTab === "My Bookings" ? "active" : ""} onClick={() => setSelectedTab("My Bookings")}>My Bookings</li>
              <li className={selectedTab === "Movie Alerts" ? "active" : ""} onClick={() => setSelectedTab("Movie Alerts")}>Movie Alerts</li>
              <li className={selectedTab === "Preferences" ? "active" : ""} onClick={() => setSelectedTab("Preferences")}>Preferences</li>
              <li className={selectedTab === "Saved Cards" ? "active" : ""} onClick={() => setSelectedTab("Saved Cards")}>Saved Cards</li>
              <li className={selectedTab === "Redeem Gift Card" ? "active" : ""} onClick={() => setSelectedTab("Redeem Gift Card")}>
              Redeem Gift Card
            </li>
            </ul>
            <div className="profile-sidebar-footer">
              <div className="profile-sidebar-notifications">
                <p>Whatsapp Notifications</p>
                <label className="switch">
                  <input type="checkbox" />
                  <span className="slider round"></span>
                </label>
              </div>
              <div className="profile-sidebar-completion">
                <p>Profile Completion</p>
                <div className="completion-bar">
                  <div className="completion-bar-fill" style={{ width: "100%" }}></div>
                </div>
              </div>
              <div className="profile-sidebar-logout">
                <button onClick={showLogoutPopup}>Logout</button>
              </div>
            </div>
          </div>
          <div className="profile-main">
            {renderTabContent()}
          </div>
        </div>
        {isLogoutPopupVisible && (
          <div className="logout-popup">
            <div className="logout-popup-content">
              <p>Are you sure you want to logout?</p>
              <button onClick={confirmLogout}>Yes</button>
              <button onClick={hideLogoutPopup}>No</button>
            </div>
          </div>
        )}
      </div>
      <Footer/>
    </>
  );
};

export default Profile;
