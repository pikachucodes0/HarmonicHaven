import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for react-toastify
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1); // Add quantity state

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/store/${id}`);
        setProduct(response.data.product);
      } catch (err) {
        setError("Failed to fetch product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  const handleBuyNow = () => {
    console.log('Buy Now clicked');
    toast.success(`${quantity} item(s) purchased successfully!`, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      style: {
        backgroundColor: 'black',
        color: 'white',
        fontWeight: 'bold',
        borderRadius: '5px',
        padding: '10px 20px',
      }
    });
  };
  

  return (
    <div className="product-detail">
      {/* Toast container to display the toast */}
      <ToastContainer /> 

      {/* Left Side - Product Image */}
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>

      {/* Right Side - Product Details */}
      <div className="product-info">
        <h1>{product.name}</h1>
        <p className="price">${(product.price * quantity).toFixed(2)}</p>
        <p>{product.description}</p>

        {/* Quantity Selector */}
        <div className="quantity-selector">
          <label>Quantity: </label>
          <button 
            className="qty-decrease" 
            onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
          >
            -
          </button>
          <span className="qty-display">{quantity}</span>
          <button 
            className="qty-increase" 
            onClick={() => setQuantity((prev) => prev + 1)}
          >
            +
          </button>
        </div>

        {/* Buttons */}
        <div className="buttons">
          {/* Button triggers handleBuyNow */}
          <button className="buy-now" onClick={handleBuyNow}>Buy Now</button>
          <Link to="/store">
            <button className="return-btn">Back</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
