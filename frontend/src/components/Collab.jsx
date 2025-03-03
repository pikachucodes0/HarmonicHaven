import React, { useState } from "react";
import image from "../assets/image.png";

function Collab() {
  const [showMore, setShowMore] = useState(false);

  return (
    <div id="collab">
      <div className="collab-image">
        <img src={image} alt="Collaboration" />
      </div>
      <div className="collab-text">
        <h1>Collaborate with anyone, from anywhere</h1>
        <p>
          We’re all about connecting artists, and that’s why we host Collab
          Sessions—exclusive jam sessions and networking events designed to bring musicians, producers, and vocalists together.
        </p>
        <button onClick={() => setShowMore(true)}>Read More</button>
      </div>

      {/* Read More Section (Modal Style) */}
      {showMore && (
        <div className="read-more-overlay">
          <div className="read-more-content">
            <h2>More About Collab Sessions</h2>
            <p>
                <ul>
                    <li>
        🎤  Open Mic & Freestyle Sessions 

                    </li>
                    <li>
        🎧  Live Beat-Making & Songwriting Corners

                    </li>
                    <li>
        🎼  Studio Jam Sessions 

                    </li>
                    <li>
        🤝  Networking Opportunities 

                    </li>
                </ul>
        The best part? You don’t need to bring a full setup—just your passion and creativity. 
        We provide the space, the vibes, and the equipment. 
        So, what do you think? Ready to join the next session?
              </p>
            <button onClick={() => setShowMore(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Collab;
