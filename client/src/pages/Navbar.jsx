import "../pages/Navbar.css";
// import logo from '../../Assets/Logo.png'
import menu_icon from '../Assets/menu_icon.svg';
import { useEffect, useState } from 'react'
// import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {
    const [sticky, setSticky] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);
  
    useEffect(() => {
      const handleScroll = () => {
        setSticky(window.scrollY > 50);
      };
  
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);
  

    const toggleMenu = () => {
      setMobileMenu((prev) => !prev);
    };
  
    return (
      <nav className={`container ${sticky ? "dark-nav" : ""}`}>
        {/* <img src={logo} alt="Logo" className="logo" /> */}
  
        
        <img
          src={menu_icon}
          alt="Menu Icon"
          className="menu-icon"
          onClick={toggleMenu}
        />
  
        {/* Nav Links */}
        <ul className={mobileMenu ? "" : "hide-mobile-menu"}>
          <li>
            <RouterLink to="/" onClick={() => setMobileMenu(false)}>
              Home
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/services" onClick={() => setMobileMenu(false)}>
              Services
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/login" onClick={() => setMobileMenu(false)}>
              LogIn
            </RouterLink>
          </li>
        </ul>
      </nav>
    );
  };
  
  export default Navbar;