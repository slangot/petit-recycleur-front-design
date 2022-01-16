import React from "react";
import Navbar from "../Navbar/Navbar";

import './Home.css';

import Logo from '../../assets/images/Le-petit-recycleur-logo-black.png'
import home_img from '../../assets/images/home_img.png' 

const Home = () => {
  return (
    <div id="page-top" className="Home">
      {/* <Navbar /> */}
      <div className="desktop-version">
        <header className="masthead">
              <div className="container px-5">
                  <div className="row gx-5 align-items-center">
                      <div className="col-lg-6">
                          <div className="mb-5 mb-lg-0 text-center text-lg-start">
                              <h1 className="display-1 mb-3">Le recyclage à portée de tous.</h1>
                              <p className="lead fw-normal text-muted mb-3">Découvrez facilement si votre emballage est recyclable.</p>
                              <a href="/us"><button type="button" class="btn btn_custom_brown btn-sm">En savoir plus</button></a>
                          </div>
                      </div>
                      <div className="col-lg-6">
                      <img src={home_img} className="home_img" alt="home" />
                      </div>
                      <div className="row text-center mt-3">
                        <a href="/scan">
                          <button type="button" class="btn btn-success btn-lg">RECYCLER</button>
                        </a>
                      </div>
                  </div>
              </div>
          </header>
        </div>
        <div className="mobile-version">
          <header className="masthead">
            <div className="home-logo-container">
              <img src={Logo} alt="logo mobile" />
            </div>
                <div className="container px-5">
                    <div className="row gx-5 align-items-center">
                        <img src={home_img} className="home_img" alt="home" />
                        </div>
                        <div className="mobile_separator"></div>
                        <div className="mobile_separator"></div>
                        <div className="col-lg-6">
                            <div className="mb-5 mb-lg-0 text-center text-lg-start">
                                <h1 className="display-1 mb-3">Le recyclage à portée de tous.</h1>
                                <div className="row text-center mt-3">
                                <a href="/scan">
                                  <button type="button" class="btn btn-success btn-lg">RECYCLER</button>
                                </a>
                              </div>
                              <div className="mobile_separator"></div>
                              <p className="lead fw-normal text-muted mb-3">Découvrez facilement si votre emballage est recyclable.</p>
                              <a href="/us"><button type="button" class="btn btn_custom_brown btn-sm">En savoir plus</button></a>
                            </div>
                        </div>
                </div>
            </header>
        </div>
    </div>
  );
}
 
export default Home;