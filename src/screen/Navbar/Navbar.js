import React, { useRef, useState } from "react";

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
          <nav class="menu-global-container">
            <a class="menu-brand" href="/"><img src={Logo} className="menu-logo" alt="logo" /></a>
              <ul class="menu-list">
                  <li class="menu-item"><a class="menu-link" href="/scan">Scanner</a></li>
                  <li class="menu-item"><a class="menu-link" href="/recycling">Le recyclage</a></li>
                  <li class="menu-item"><a class="menu-link" href="/contribute">Contribuer</a></li>
                  <li class="menu-item"><a class="menu-link" href="/us">A propos</a></li>
              </ul>
          </nav>
        </div>
        <div className="menu-mobile">
          <nav class="menu-global-container">
              <ul class="menu-list">
                <li class="menu-item" onClick={() => setActiveLink(0)}>
                  <a class={link0 ? "active-menu" : "menu-link"} href="/"><i class="bi bi-house-door-fill"></i></a>
                </li>
                <li class="menu-item" onClick={() => setActiveLink(1)}>
                  <a class={link1 ? "active-menu" : "menu-link"} href="/recycling"><i class="bi bi-recycle"></i></a> {/*{link1 ? <><span className="active-menu-deco-left"></span><span className="active-menu-deco-right"></span></> : null }*/}
                </li>
                <li class="menu-item" onClick={() => setActiveLink(2)}>
                  <a  class={link2 ? "active-menu" : "menu-link"} href="/scan"><i class="bi bi-upc-scan"></i></a>
                </li>
                <li class="menu-item" onClick={() => setActiveLink(3)}>
                  <a class={link3 ? "active-menu" : "menu-link"} href="/contribute"><i class="bi bi-people-fill"></i></a>
                </li>
                <li class="menu-item" onClick={() => setActiveLink(4)}>
                  <a class={link4 ? "active-menu" : "menu-link"} href="/info"><i class="bi bi-info-circle"></i></a>
                </li>
              </ul>
          </nav>
        </div>




      {/*
      //   <nav class="navbar-desktop navbar navbar-expand-lg navbar-light bg-light">
      //   <div class="collapse navbar-collapse">
      //     <ul class="navbar-container navbar-nav mr-auto mt-2 mt-lg-0">
      //       <div className="navbar-logo-container navbar-nav mr-auto">
      //         <li class="nav-item">
      //           <a class="navbar-brand" href="/"><img src={Logo} className="navbar_logo_unique" alt="logo" /></a>
      //         </li>
      //       </div>
      //       <div className="navbar-link-container navbar-nav mr-auto">
      //       <li class="nav-item">
      //           <a class="nav-link" href="/scan">Scanner</a>
      //         </li>
      //         <li class="nav-item">
      //           <a class="nav-link" href="/recycling">Le recyclage</a>
      //         </li>
      //         <li class="nav-item">
      //           <a class="nav-link" href="/contribute">Contribuer</a>
      //         </li>
      //         <li class="nav-item">
      //           <a class="nav-link" href="/us">Qui sommes nous ?</a>
      //         </li>
      //       </div>
      //     </ul>
      //   </div>
      // </nav>
      
      {/* <nav class="navbar-mobile navbar navbar-expand-lg navbar-light bg-light">
        <div class="collapse navbar-collapse">
          <ul class="navbar-container navbar-nav mr-auto mt-2 mt-lg-0">
            <div className="navbar-logo-container navbar-nav mr-auto">
              <li class="nav-item">
                <a class="navbar-brand" href="/"><img src={LogoUnique} className="navbar_logo" alt="logo" /></a>
              </li>
            </div>
            <div className="navbar-link-container navbar-nav mr-auto">
            <li class="nav-item">
                <a class="nav-link" href="/scan"><i class="bi bi-upc-scan"></i></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/recycling"><i class="bi bi-recycle"></i></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/contribute"><i class="bi bi-people-fill"></i></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/us"><i class="bi bi-info-circle"></i></a>
              </li>
            </div>
          </ul>
        </div>
      </nav> 
      */}
      </>

    );
}
 
export default Navbar;