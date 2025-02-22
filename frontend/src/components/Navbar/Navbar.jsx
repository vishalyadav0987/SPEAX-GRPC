import React, { useEffect, useRef, useState } from 'react'
import Logo from '../../assets/main-logo@3x.webp'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import gsap from 'gsap'

const Navbar = () => {
  const [isNavOpen,setIsNavOpen] = useState(true);
  const navBarCloseOpenRef = useRef(null)
  const openNavBar = () => {
    setIsNavOpen(true);
    gsap.to(navBarCloseOpenRef.current, {
      x: 0,
      duration: 0.5,
      ease: 'power3.out',
    });
  };
  const closeNavBar = () => {
    gsap.to(navBarCloseOpenRef.current, {
      x: '100%',
      duration: 0.5,
      ease: 'power3.in',
      onComplete: () => setIsNavOpen(false), // Ensure state updates after animation
    });
  };
  return (
    <>
      <header className="header">
        <div className="header-container">
          <Link to="/" className="logo">
            <img src={Logo} alt="logo" style={{filter:"invert(2)"}}/>
          </Link>


          <nav className="nav">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/">About</Link></li>
              <li><Link to="/">Services</Link></li>
              <li><Link to="/">Contact</Link></li>
            </ul>
          </nav>

          <div className='header-button'>
            <button>Sign in</button>
            <button>Free Trail</button>
          </div>
          <div className='hamburg-icon'>
            <GiHamburgerMenu onClick={openNavBar}/>
            </div>
        </div>
      <div className='responsive-slider-nav'
      ref={navBarCloseOpenRef}>
          <div className="cross-icon" onClick={closeNavBar}>
          <RxCross2 />
          </div>
          <nav className="responsive-nav">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/">About</Link></li>
              <li><Link to="/">Services</Link></li>
              <li><Link to="/">Contact</Link></li>
            </ul>
          </nav>
          <div className='responsive-header-button'>
            <button>Sign in</button>
            <button>Free Trail</button>
          </div>
      </div>
      </header>
    </>
  )
}

export default Navbar
