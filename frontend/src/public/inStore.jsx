// import React, { useEffect } from "react";
// import "./inStore.css";
// import { Link, useNavigate } from "react-router-dom";
// import product1 from "../assets/guitar1.png"; 
// import product2 from "../assets/guitar2.png";
// import product3 from "../assets/gibson1.png";
// import product4 from "../assets/eastmanGuitar.png";
// import product5 from "../assets/capo.png";
// import product6 from "../assets/agaamp.png";
// import product7 from "../assets/picks.png";
// import product8 from "../assets/voxpedal.png";
// import product9 from "../assets/mic.png";
// import product10 from "../assets/ds.jpg";

// const products = [
//   { id: 1, name: "Fender Telecaster 1990", price: "$499", image: product1, description: "A classic Fender Telecaster from 1990." },
//   { id: 2, name: "Fender Stratocaster 1979", price: "$599", image: product2, description: "Vintage Fender Stratocaster from 1979." },
//   { id: 3, name: "Gibson Les Paul Cherry-Red", price: "$599", image: product3, description: "Iconic Gibson Les Paul in Cherry Red finish." },
//   { id: 4, name: "EastMan Acoustic X19", price: "$199", image: product4, description: "Beautiful acoustic guitar for beginners and pros." },
//   { id: 5, name: "Gabi Capo", price: "$10", image: product5, description: "High-quality capo for acoustic and electric guitars." },
//   { id: 6, name: "Aga Amp s90", price: "$199", image: product6, description: "Powerful amplifier for electric guitars." },
//   { id: 7, name: "Customized Guitar Picks", price: "$199", image: product7, description: " " },
//   { id: 8, name: "Vox Tube Boost Pedal", price: "$199", image: product8, description: "Pedal to enhance your guitar's tone." },
//   { id: 9, name: "Studio Microphone r14", price: "$210", image: product9, description: "Professional studio microphone for recording." },
//   { id: 10, name: "Sonor Drum Stick", price: "$99", image: product10, description: "Durable and high-quality drum sticks." },
// ];

// function InStore() {
//   const navigate = useNavigate();
  
//   // Redirect to home page ("/") or dashboard ("/dashboard") on back button click
//   const handleBackButtonClick = () => {
//     const token = localStorage.getItem("token"); // Adjust this to where your token is stored
//     if (token) {
//       navigate("/dashboard");
//     } else {
//       navigate("/");
//     }
//   };

//   return (
//     <div className="store-page">
//       <h1>Welcome to <span>Our Store</span></h1>
//       <p>Find the best Musical Instruments at Unbeatable Prices!</p>

//       <div className="product-grid">
//         {products.map((product) => (
//           <Link key={product.id} to={`/product/${product.id}`} className="product-card">
//             <img src={product.image} alt={product.name} />
//             <h2>{product.name}</h2>
//             <p className="price">{product.price}</p>
//           </Link>
//         ))}
//       </div>  

//       <button onClick={handleBackButtonClick} className="back-btn2">Back</button>
//     </div>
//   );
// }

// export default InStore;
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./inStore.css";
import { Link, useNavigate } from "react-router-dom";

function InStore() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Fetch products from the database
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/store/list"); // Adjust API URL as needed
        setProducts(response.data.products); // Ensure this matches your API response structure
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Redirect to home page or dashboard on back button click
  const handleBackButtonClick = () => {
    const token = localStorage.getItem("token");
    navigate(token ? "/dashboard" : "/");
  };

  return (
    <div className="store-page">
      <h1>Welcome to <span>Our Store</span></h1>
      <p>Find the best Musical Instruments at Unbeatable Prices!</p>

      <div className="product-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`} className="product-card">
              <img src={product.image} alt={product.name} />
              <h2>{product.name}</h2>
              <p className="price">${product.price}</p>
            </Link>
          ))
        ) : (
          <p>Loading products...</p>
        )}
      </div>

      <button onClick={handleBackButtonClick} className="back-btn2">Back</button>
    </div>
  );
}

export default InStore;
