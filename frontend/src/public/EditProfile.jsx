import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./EditProfile.css";

function EditProfile() {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  const fetchCurrentUser = async () => {
    const token = localStorage.getItem("token");
    console.log("Token retrieved:", token);

    if (token) {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/auth/init",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("Fetched current user:", response.data); // Log the full response here
        setCurrentUser(response.data.data.userId);
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    } else {
      console.log("No token found in localStorage.");
    }
  };

  // Use effect to fetch current user data on component mount
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (currentUser) {
      const token = localStorage.getItem("token");
      console.log("Fetching user profile with userId:", currentUser);

      axios
        .get(`http://localhost:5000/api/user/getProfile/${currentUser}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log("Fetched user profile:", response.data); // Log the profile data
          const userdata = response.data.data;
          console.log("UserData", userdata);

          // Set user data to populate the form fields
          setUserData({
            username: userdata.username,
            email: userdata.email,
            password: "", // Password should be blank for the user to enter a new one
          });
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
        });
    } else {
      console.log("currentUser is null, skipping user profile fetch.");
    }
  }, [currentUser]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); // Consistent token name

    // Remove the password field if it's empty
    const dataToSubmit = { ...userData };
    if (!dataToSubmit.password) {
      delete dataToSubmit.password;
    }

    console.log("Submited Data", dataToSubmit);

    axios
      .put("http://localhost:5000/api/user/profile", dataToSubmit, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setMessage("Profile updated successfully!");
        setTimeout(() => navigate("/dashboard"), 2000);
      })
      .catch((error) => {
        setMessage("Error updating profile.");
        console.error("Update error:", error);
      });
  };

  const handleBack = () => {
    navigate("/dashboard"); // Navigate back to the dashboard or a specific page
  };

  return (
    <div className="edit-profile-container">
      <button className="back-btnEditProfile" onClick={handleBack}>
        Back
      </button>
      <h2>Edit Profile</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={userData.username}
          onChange={handleChange}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          required
        />

        <label>New Password (leave blank to keep current password):</label>
        <input
          type="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
        />

        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default EditProfile;
