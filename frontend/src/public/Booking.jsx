// import React, { useEffect, useState } from "react";
// import "./Booking.css";
// import { Link } from "react-router-dom";
// import image1 from "../assets/studio1.png"; 
// import image2 from "../assets/studio2.png";
// import image3 from "../assets/studio3.png";
// import image4 from "../assets/studio4.png";
// import image5 from "../assets/studio5.png";
// import image6 from "../assets/studio6.png";
// import { IoMdArrowRoundBack } from "react-icons/io";
// import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
// import "react-toastify/dist/ReactToastify.css"; // Import the CSS for react-toastify

// const studios = [
//   { id: 1, name: "Sound Garden", price: 20, image: image1 },
//   { id: 2, name: "Dream Record Studio", price: 19, image: image2 },
//   { id: 3, name: "AudioAdvent", price: 15, image: image3 },
//   { id: 4, name: "Studio Nepal", price: 9.99, image: image4 },
//   { id: 5, name: "Nepal Reverb", price: 10, image: image5 },
//   { id: 6, name: "BackTrack 6", price: 12, image: image6 },
// ];

// function Booking() {
//   const [selectedStudio, setSelectedStudio] = useState(null);
//   const [bookingDate, setBookingDate] = useState("");
//   const [bookingTime, setBookingTime] = useState(""); 
//   const [bookingHours, setBookingHours] = useState(1);

//   // Scroll to top on page load
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   const handleStudioSelect = (studio) => {
//     setSelectedStudio(studio);
//     // Scroll smoothly to the booking form
//     document.querySelector(".booking-form")?.scrollIntoView({ behavior: "smooth" });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (selectedStudio && bookingDate && bookingTime && bookingHours) {
//       const totalPrice = selectedStudio.price * bookingHours;
//       toast.success(
//         `Booking confirmed for ${selectedStudio.name} on ${bookingDate} at ${bookingTime} o'clock for ${bookingHours} hour(s).\nTotal Price: $${totalPrice}`,
//         {
//           position: "bottom-right",
//           autoClose: 5000,
//           hideProgressBar: true,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           style: {
//             backgroundColor: "black", // Set the toast background color to black
//             color: "white", // Set the text color to white for better contrast
//           },
//         }
//       );
//     } else {
//       toast.error("Please select a studio, booking date, time, and number of hours.", {
//         position: "top-center",
//         autoClose: 5000,
//         hideProgressBar: true,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         style: {
//           backgroundColor: "black", // Set the toast background color to black
//           color: "white", // Set the text color to white
//         },
//       });
//     }
//   };

//   return (
//     <div className="booking-container">
//       <h1>Book Your Studio</h1>
//       <p>Choose the best studio for your next project!</p>

//       <div className="studios-container">
//         {studios.map((studio) => (
//           <div 
//             key={studio.id} 
//             className={`studio-box ${selectedStudio?.id === studio.id ? "selected" : ""}`} 
//             onClick={() => handleStudioSelect(studio)}
//           >
//             <img src={studio.image} alt={studio.name} />
//             <div className="studio-name">{studio.name}</div>
//           </div>
//         ))}
//       </div>

//       {selectedStudio && (
//         <form className="booking-form" onSubmit={handleSubmit}>
//           <label htmlFor="bookingDate">Select Booking Date</label>
//           <input 
//             type="date" 
//             id="bookingDate" 
//             value={bookingDate} 
//             onChange={(e) => setBookingDate(e.target.value)} 
//             required 
//           />

//           <label htmlFor="bookingTime">Select Booking Time</label>
//           <input 
//             type="time" 
//             id="bookingTime" 
//             value={bookingTime} 
//             onChange={(e) => setBookingTime(e.target.value)} 
//             required 
//           />

//           <label htmlFor="bookingHours">Number of Hours</label>
//           <input 
//             type="number" 
//             id="bookingHours" 
//             value={bookingHours} 
//             min="1"
//             onChange={(e) => setBookingHours(Number(e.target.value))}
//             required 
//           />

//           <p>Total Price: ${selectedStudio.price * bookingHours}</p>
//           <button type="submit">Confirm</button>
//         </form>
//       )}

//       <Link to="/dashboard">
//         <button className="back-btn"><IoMdArrowRoundBack /></button>
//       </Link>

//       <ToastContainer /> {/* Add ToastContainer to render the toast messages */}
//     </div>
//   );
// }

// export default Booking;
import React, { useEffect, useState } from "react";
import axios from "axios"; // Import axios for making API requests
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Booking.css";

function Booking() {
  const [studios, setStudios] = useState([]); // State for studios
  const [selectedStudio, setSelectedStudio] = useState(null);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState(""); 
  const [bookingHours, setBookingHours] = useState(1);

  // Fetch studios from the backend when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchStudios(); // Fetch studios on page load
  }, []);

  const fetchStudios = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/studio/list"); // Update with your correct API URL
      setStudios(response.data.studios); // Update the state with the fetched studios
    } catch (error) {
      console.error("Error fetching studios:", error);
    }
  };

  const handleStudioSelect = (studio) => {
    setSelectedStudio(studio);
    document.querySelector(".booking-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedStudio && bookingDate && bookingTime && bookingHours) {
      const totalPrice = selectedStudio.price * bookingHours;
      toast.success(
        `Booking confirmed for ${selectedStudio.name} on ${bookingDate} at ${bookingTime} o'clock for ${bookingHours} hour(s).\nTotal Price: $${totalPrice}`,
        {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          style: {
            backgroundColor: "black",
            color: "white",
          },
        }
      );
    } else {
      toast.error("Please select a studio, booking date, time, and number of hours.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          backgroundColor: "black",
          color: "white",
        },
      });
    }
  };

  return (
    <div className="booking-container">
      <h1>Book Your Studio</h1>
      <p>Choose the best studio for your next project!</p>

      <div className="studios-container">
        {studios.length > 0 ? (
          studios.map((studio) => (
            <div 
              key={studio.id} 
              className={`studio-box ${selectedStudio?.id === studio.id ? "selected" : ""}`} 
              onClick={() => handleStudioSelect(studio)}
            >
              <img src={studio.image} alt={studio.name} />
              <div className="studio-name">{studio.name}</div>
            </div>
          ))
        ) : (
          <p>No studios available at the moment.</p>
        )}
      </div>

      {selectedStudio && (
        <form className="booking-form" onSubmit={handleSubmit}>
          <label htmlFor="bookingDate">Select Booking Date</label>
          <input 
            type="date" 
            id="bookingDate" 
            value={bookingDate} 
            onChange={(e) => setBookingDate(e.target.value)} 
            required 
          />

          <label htmlFor="bookingTime">Select Booking Time</label>
          <input 
            type="time" 
            id="bookingTime" 
            value={bookingTime} 
            onChange={(e) => setBookingTime(e.target.value)} 
            required 
          />

          <label htmlFor="bookingHours">Number of Hours</label>
          <input 
            type="number" 
            id="bookingHours" 
            value={bookingHours} 
            min="1"
            onChange={(e) => setBookingHours(Number(e.target.value))}
            required 
          />

          <p>Total Price: ${selectedStudio.price * bookingHours}</p>
          <button type="submit">Confirm</button>
        </form>
      )}

      <Link to="/dashboard">
        <button className="back-btn"><IoMdArrowRoundBack /></button>
      </Link>

      <ToastContainer />  
    </div>
  );
}

export default Booking;
