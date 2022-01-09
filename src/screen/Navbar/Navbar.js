import React from "react";

import './Navbar.css';

import Logo from '../../assets/images/Le-petit-recycleur-logo-black.png'

const Navbar = () => {
  return (
    <nav class="navbar navbar-expand-lg navbar-light shadow-sm" id="mainNav">
            <div class="container">
                <a class="navbar-brand" href="/"><img src={Logo} className="navbar_logo" alt="logo" /></a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    Menu
                    <i class="bi-list"></i>
                </button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item"><a class="nav-link" href="/scan">Scanner</a></li>
                        <li class="nav-item"><a class="nav-link" href="/recycling">Le recyclage</a></li>
                        <li class="nav-item"><a class="nav-link" href="/contribute">Contribuer</a></li>
                        <li class="nav-item"><a class="nav-link" href="/us">Qui sommes nous ?</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
 
export default Navbar;