import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaStore, FaCalendarAlt, FaSignOutAlt } from "react-icons/fa";
import logo from "../assets/logo.png";
import axios from "axios";
import "./Dashboard.css";

function Dashboard() {
  const [userName, setUserName] = useState("Guest");
  const [bookings, setBookings] = useState([]);
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

  useEffect(() => {
    console.log("useEffect for fetchCurrentUser running...");
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
          const { name, bookings } = response.data;
          const userdata = response.data.data;
          setUserName(userdata.username);
          setBookings(bookings || []);
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
          setUserName("Guest");
        });
    } else {
      console.log("currentUser is null, skipping user profile fetch.");
    }
  }, [currentUser]);

  const handleLogout = () => {
    localStorage.clear();
    console.log("Logged out");
  };

  return (
    <div className="customer-dashboard-container">
      <nav className="customer-dashboard-sidebar">
        <img src={logo} alt="Logo" />
        <ul>
          <li>
            <Link to="/booking">
              <FaCalendarAlt className="icon" /> Book a Studio
            </Link>
          </li>
          <li>
            <Link to="/store">
              <FaStore className="icon" /> Store
            </Link>
          </li>
          <li>
            <Link to="/edit-profile">
              <FaUser className="icon" /> Profile
            </Link>
          </li>
          <li>
            <Link to="/" onClick={handleLogout}>
              <FaSignOutAlt className="icon" /> Logout
            </Link>
          </li>
        </ul>
      </nav>

      <div className="customer-dashboard-content">
        <h1>Welcome</h1>
        <h1>
          {userName}!</h1>

        {/* <div className="upcoming-bookings">
          <h3>🎤 Upcoming Bookings</h3>
          {bookings.length === 0 ? (
            <p>You have no upcoming bookings.</p>
          ) : (
            <ul>
              {bookings.map((booking, index) => (
                <li key={index}>
                  <span className="booking-studio">{booking.studioName}</span>{" "}
                  on <span className="booking-date">{booking.date}</span> for{" "}
                  <span className="booking-hours">{booking.hours}</span> hour(s)
                </li>
              ))}
            </ul>
          )}
        </div> */}

        <div className="quick-actions">
          <h3>⚡ Quick Actions</h3>
          <div className="action-cards">
            <Link to="/booking" className="action-card">
              <FaCalendarAlt className="card-icon" />
              <span>Book a Studio</span>
            </Link>
            <Link to="/store" className="action-card">
              <FaStore className="card-icon" />
              <span>Shop Now</span>
            </Link>
            <Link to="/edit-profile" className="action-card">
              <FaUser className="card-icon" />
              <span>Edit Profile</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
