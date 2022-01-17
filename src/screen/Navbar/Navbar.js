import React, { useRef, useState } from "react";
import { Router, NavLink, Link } from 'react-router-dom';

import './Navbar.css';

import Logo from '../../assets/images/Le-petit-recycleur-logo-black.png';
import LogoUnique from '../../assets/images/unique_logo_1.png'

const Navbar = () => {

  const [link0, setLink0] = useState(true);
  const [link1, setLink1] = useState(false);
  const [link2, setLink2] = useState(false);
  const [link3, setLink3] = useState(false);
  const [link4, setLink4] = useState(false);

  const resetLink = () => {
    setLink0(false)
    setLink1(false)
    setLink2(false)
    setLink3(false)
    setLink4(false)
  }

  const setActiveLink = (index) => {
    console.log(index)
    resetLink()
    switch (index) {
      case 0:
        setLink0(true)
        break;
      case 1:
        setLink1(true)
        break;
      case 2:
        setLink2(true)
        break;
      case 3:
        setLink3(true)
        break;
      case 4:
        setLink4(true)
        break;
      default:
        break;
    }
  }

  return (
    <>
        <div className="menu-desktop">
          <nav className="menu-global-container">
            <a className="menu-brand" href="/"><img src={Logo} className="menu-logo" alt="logo" /></a>
              <ul className="menu-list">
                  <li className="menu-item"><a className="menu-link" href="/scan">Scanner</a></li>
                  <li className="menu-item"><a className="menu-link" href="/recycling">Le recyclage</a></li>
                  <li className="menu-item"><a className="menu-link" href="/contribute">Contribuer</a></li>
                  <li className="menu-item"><a className="menu-link" href="/info">A propos</a></li>
              </ul>
          </nav>
        </div>
        <div className="menu-mobile">
          <nav className="menu-global-container">

                <div className="dvNav">
                  <NavLink activeclassname="active" exact='true' to="/"><i className="bi bi-house-door-fill"></i></NavLink>
                  <NavLink activeclassname="active" to="/recycling"><i className="bi bi-recycle"></i></NavLink>
                  <NavLink activeclassname="active" to="/scan"><i className="bi bi-upc-scan"></i></NavLink> 
                  <NavLink activeclassname="active" to="/contribute"><i className="bi bi-people-fill"></i></NavLink>
                  <NavLink activeclassname="active" to="/info"><i className="bi bi-info-circle"></i></NavLink>
                </div>

          </nav>
        </div>
    </>

    );
}
 
export default Navbar;