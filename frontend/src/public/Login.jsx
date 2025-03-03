import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { API_BASE_URL } from "./apiConfig";
import "./login.css";
import * as jwt_decode from "jwt-decode"; // Use * as import

// Define validation schema using Yup
const schema = yup.object().shape({
  email: yup.string().required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const navigate = useNavigate();
  
  // Set up react-hook-form with validation schema
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Handle login form submission
  const onSubmit = (data) => {
    console.log("Request Data:", data);

    // Make API call to authenticate user
    axios
      .post(`${API_BASE_URL}/api/auth/login`, data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log("Login Response:", response.data);

        // If login is successful, save the access token and user data in localStorage
        if (response.data.data.access_token) {
          localStorage.setItem("token", response.data.data.access_token);
          localStorage.setItem("role", response.data.data.role);
          localStorage.setItem("userName", response.data.data.userName); // Save userName
          localStorage.setItem("bookings", JSON.stringify(response.data.data.bookings)); // Save bookings

          let userRole = response.data.data.role;
          console.log("User Role:", userRole);

          // Redirect to dashboard or admin page based on user role
          if (userRole === "admin") {
            navigate("/admin");
          } else {
            navigate("/dashboard");
          }
        } else {
          alert("Login failed! Check credentials.");
        }
      })
      .catch((error) => {
        console.error("Error logging in:", error.response?.data || error.message);
        alert("Error logging in. Please try again.");
      });

    reset(); // Reset form after submission
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} id="loginForm">
        <div className="container">
          <div className="login">
            <h2>LOGIN</h2>
            <div className="formcontrol">
              <input
                type="email"
                id="email"
                className="input1"
                placeholder="Email"
                {...register("email")}
              />
              <p className="error-message">{errors.email?.message}</p>
            </div>
            <div className="formcontrol">
              <input
                type="password"
                id="pass"
                className="input2"
                placeholder="Password"
                {...register("password")}
              />
              <p className="error-message">{errors.password?.message}</p>
            </div>
            <button className="btn" type="submit">
              Log in
            </button>
            
            <p className="signup-text">
              Don't have an account?{" "}
              <Link to="/Register" className="a1">
                Signup
              </Link>
            </p>
          </div>
          <div className="image"></div>
        </div>
      </form>
      <div className="footer-links">
        <a href="#">Terms & Conditions</a> | <a href="#">Support</a> |{" "}
        <a href="#">Customer Care</a>
      </div>
    </div>
  );
};

export default Login;
