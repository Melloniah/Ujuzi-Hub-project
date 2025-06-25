import "../pages/Navbar.css";
// import logo from '../../Assets/Logo.png'
import menu_icon from '../Assets/menu_icon.svg';
import { useEffect, useState } from 'react'
// import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {

    const [sticky, setSticky] = useState(false);

    useEffect(()=>{
        window.addEventListener('scroll', ()=>{
            window.scrollY > 50 ? setSticky(true) : setSticky(false);

        })
    },[])

    const [mobileMenu, setMobileMenu]= useState(false);
    const toggleMenu = ()=>{
        mobileMenu? setMobileMenu(false) : setMobileMenu (true);

    }


  return (
    <nav className= {`container ${sticky? 'dark-nav' : 'hide-mobile-menu'}`}>
        {/* <img src= {logo} alt='' className='logo'/> */}
        
        <ul className={mobileMenu?'':''}>
            <li><RouterLink to='/'>Home</RouterLink></li>

            {/* <li><ScrollLink to='mt-4' smooth={true} offset={-260} duration={500}>Home</ScrollLink></li> */}
            <li><RouterLink to='/tools'>Services</RouterLink></li>
            <li><RouterLink to='/about'>About Us</RouterLink></li>
            <li> <RouterLink to='/contact'> Contact Us </RouterLink></li>
            <li> <RouterLink to='/container-login'>LogIn</RouterLink></li>
            <img src={menu_icon} alt="" className='menu-icon' onClick={toggleMenu}/>
        </ul>

    </nav>
  )
}

export default Navbar;