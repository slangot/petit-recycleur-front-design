import React from 'react';

import './InfoPage.css'

import Logo from '../../assets/images/Le-petit-recycleur-logo-black.png'
import NatureLogo from '../../assets/images/nature_img.png'
import ManRecycling from '../../assets/images/man-recycling.png'

const InfoPage = () => {
  return (
    <div className="InfoPage">
    <div className="InfoPage-decoration1"></div>
    <div className="InfoPage-decoration2"></div>
    <div className="InfoPage-decoration3"></div>

      <div className="InfoPage-desktop">

        
        <div className="left-info-container">
        <h2>A propos de nous</h2>
          <p>
            <i>Vous est-il déjà arrivé de ne pas savoir si votre emballage pouvait être recycler ou non?</i>
          </p>
          <p>
            Le Petit Recycleur est là pour vous aider à répondre à cette question.
          </p>
          <p><span>&#127757;</span> De nos jours le recyclage est plus qu'indispensable afin de préserver notre Terre et le futur de nos enfants.</p>
            <button className="btn btn-outline-success">
              <a href="/recycling">En savoir plus sur le recyclage</a>
            </button>
            <button className="btn btn_custom_brown">
              <a href="/contact">Nous contacter</a>
            </button>
          <p className="data-info-container">
            Le site Le Petit Recycleur utilise la camera de votre appareil pour scanner les codes barres.<br />
            Nous ne conservons aucunes données personnelles
          </p>
          <p className="img-info-container">
            Les images présentes sur le site sont libres de droits et proviennent de <br />
            <a href="https://www.freepng.fr">www.freepng.fr</a> et <a href="https://pixabay.com/fr/">www.pixabay.com</a>
          </p>
        </div>
        <div className="right-info-container">
          <img src={ManRecycling} alt="ecology logo" />
        </div>

      </div>

      <div className="InfoPage-mobile">
        <div className="top-mobile-logo-container">
          <a href="/">
            <img src={Logo} className="top-mobile-logo" alt="logo mobile" />
          </a>
        </div>
        <h2>Qui sommes-nous ?</h2>
        <div className="nature-img-congtainer">
          <img src={NatureLogo} alt="nature logo" />
        </div>
          <p>
            <i>Vous est-il déjà arrivé de ne pas savoir si votre emballage pouvait être recycler ou non?</i>
          </p>
          <p>
            Le Petit Recycleur est là pour vous aider à répondre à cette question.
          </p>
          <p><span>&#127757;</span> De nos jours le recyclage est plus qu'indispensable afin de préserver notre Terre et le futur de nos enfants.</p>
          <a href="/recycling">
            <button className="btn btn-outline-success">En savoir plus sur le recyclage</button>
          </a>
          <a href="/contact">
            <button className="btn btn_custom_brown">Nous contacter</button>
          </a>
           <p className="data-info-container">
            Le site Le Petit Recycleur utilise la camera de votre appareil pour scanner les codes barres.<br />
            Nous ne conservons aucunes données personnelles.
          </p>
          <p className="img-info-container">
            Les images présentes sur le site sont libres de droits et proviennent de <br />
            <a href="https://www.freepng.fr">www.freepng.fr</a> et <a href="https://pixabay.com/fr/">www.pixabay.com</a>.
          </p>

      </div>

    </div>
  );
}
 
export default InfoPage;