import { IoLogoInstagram } from "react-icons/io5";
import { FaFacebookSquare } from "react-icons/fa";
import { IoMailOpenOutline } from "react-icons/io5";
function Footer(){
  return (
    <footer className="footer" id='footer'>
      <div className="footer-container">
        
        <div className="footer-section">
          <h2 className="footer-logo">Harmonic Haven</h2>
          <p>Find Your Rythm  .</p>
        </div>

        <div className="footer-section">
          
        </div>

        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="footer-social">
            
            <a href="https://www.instagram.com/_nakarmi/" target="_blank"><i><IoLogoInstagram /></i></a>
            <a href="https://www.facebook.com" target="_blank"><FaFacebookSquare/></a>
            
            <a href="https://www.gmail.com" target="_blank"><IoMailOpenOutline /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} HarmonicHaven. All Rights Reserved.</p>
      </div>

    </footer>
  )
}

export default Footer;
