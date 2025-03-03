import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { API_BASE_URL } from "./apiConfig"; // adjust the import path as needed
import "./register.css";

// Define validation schema
const schema = yup.object().shape({
  username: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  repass: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("This field is required"),
});

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    axios
      .post(`${API_BASE_URL}/api/user/register`, data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log("Signup Response:", response.data);
        alert("Signup successful! You can now log in.");
        navigate("/Login");
      })
      .catch((error) => {
        console.error("Error during signup:", error);
        alert("Error signing up. Please try again.");
      });
    reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} id="RegisterForm">
        <div className="container">
          <div className="register">
            <h2>Create Account</h2>
            <div className="formcontrol">
              <input
                type="text"
                id="name"
                className="input1"
                placeholder="Pick a Username"
                {...register("username")}
              />
              <p className="error-message">{errors.name?.message}</p>
            </div>
            <div className="formcontrol">
              <input
                type="email"
                id="email"
                className="input2"
                placeholder="Email"
                {...register("email")}
              />
              <p className="error-message">{errors.email?.message}</p>
            </div>
            <div className="formcontrol">
              <input
                type="password"
                id="pass"
                className="input3"
                placeholder="Password"
                {...register("password")}
              />
              <p className="error-message">{errors.password?.message}</p>
            </div>
            <div className="formcontrol">
              <input
                type="password"
                id="repass"
                className="input4"
                placeholder="Confirm Password"
                {...register("repass")}
              />
              <p className="error-message">{errors.repass?.message}</p>
            </div>
            <button className="btn" type="submit">
              Register
            </button>
            <p className="signup-text">
              Already have an account?{" "}
              <Link to="/Login" className="a1">
                Login
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

export default Register;
