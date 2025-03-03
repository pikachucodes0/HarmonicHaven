import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import image1 from "../assets/studio1.png";
import image2 from "../assets/studio2.png";
import image3 from "../assets/studio3.png";
import image4 from "../assets/studio4.png";


function Feature() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedStudio, setSelectedStudio] = useState(null);

  // Studio data with details for the modal
  const studios = [
    {
      id: 1,
      name: "Sound Garden",
      image: image1,
      description: "A beautiful studio with state-of-the-art acoustics."
    },
    {
      id: 2,
      name: "Dream Record Studio",
      image: image2,
      description: "Where your musical dreams come to life."
    },
    {
      id: 3,
      name: "AudioAdvent",
      image: image3,
      description: "An adventurous space for creative sound exploration."
    },
    {
      id: 4,
      name: "Studio Nepal",
      image: image4,
      description: "Experience the vibrant spirit of Nepal through music."
    }
  ];

  // Open the modal with the selected studio's details
  const handleStudioClick = (studio) => {
    setSelectedStudio(studio);
    setShowModal(true);
  };

  // Close the modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedStudio(null);
  };

  return (
    <div id="features">
      <h1>Top Studios</h1>
      <div className="a-container">
        {studios.map((studio) => (
          <div
            className="a-box"
            key={studio.id}
            onClick={() => handleStudioClick(studio)}
          >
            <div className="a-b-img">
              <img src={studio.image} alt={studio.name} />
            </div>
            <div className="a-b-text">
              <h2>{studio.name}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Popup Styled Like the Collab Component */}
      {showModal && selectedStudio && (
        <div className="read-more-overlay2" onClick={closeModal}>
          <div
            className="read-more-content2"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{selectedStudio.name}</h2>
            <img src={selectedStudio.image} alt={selectedStudio.name} />
            <p>{selectedStudio.description}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Feature;
