import React from "react";
import aboutimage from '../assets/store1.png';
import { useNavigate } from "react-router-dom";
function Store() {
    const navigate = useNavigate();

    return(
        <div id='store'>
            <div className="store-image">
            <img src={aboutimage} alt="" />
            </div>
            <div className="store-text">
                <h1>OUR STORE</h1>
                <p>All the Musical Instruments you need for the best price without compromising the Quality</p>
                <button onClick={() => navigate('/store')}>View Store</button>
            </div>
        </div>
    )
}
export default Store;