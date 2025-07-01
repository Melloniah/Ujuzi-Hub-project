import "../pages/Navbar.css";
import logo from '../assets/Logo.png'
import menu_icon from '../assets/menu_icon.svg';
import { useEffect, useState } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useTheContext } from '../context/Provider';  // <-- import context

const Navbar = () => {
  const [sticky, setSticky] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const { user, setUser } = useTheContext();  // <-- get user and setUser
  const navigate = useNavigate();

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

  const handleLogout = async () => {
    try {
      // Call backend logout if you have one to clear cookie/session
      await fetch('/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (err) {
      console.error("Logout failed", err);
    }

    setUser(null);  // Clear user from context
    navigate('/login');  // Redirect after logout
  };

  return (
    <nav className={`navbar ${sticky ? "dark-nav" : ""}`}>
      <img
        src={logo}
        alt="Logo"
        className={`logo ${sticky ? "logo-slide-in" : "logo-slide-out"}`}
      />

      <img
        src={menu_icon}
        alt="Menu Icon"
        className="menu-icon"
        onClick={toggleMenu}
      />

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

        {user ? (
          <>
            <li>
              <span style={{ color: 'white', padding: '0 10px' }}>
                Hello, {user.username}
              </span>
            </li>
            <li>
              <button 
                onClick={() => { handleLogout(); setMobileMenu(false); }} 
                style={{ cursor: 'pointer', background: 'transparent', border: 'none', color: 'white', fontSize: '1rem' }}
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <RouterLink to="/login" onClick={() => setMobileMenu(false)}>
              Login
            </RouterLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
