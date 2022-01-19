import React, { useState } from "react";

import './Recycling.css'

import DescriptionCarton from '../../assets/images/carton.jpeg'
import DescriptionMetaux from '../../assets/images/metaux.jpeg'
import DescriptionPlastique from '../../assets/images/plastique.jpeg'
import DescriptionVerre from '../../assets/images/verre.jpeg'

import LogoAlu from '../../assets/images/alu-2.png'
import LogoAluTriangle from '../../assets/images/logo-alu-recycle-triangle.png'
import LogoPlastique from '../../assets/images/plastique-logo.jpg'
import LogoTriman from '../../assets/images/triman-logo.jpg'
import LogoMorbius from '../../assets/images/morbius.png'
import LogoTrashMan from '../../assets/images/trash-man.png'

import Logo from '../../assets/images/Le-petit-recycleur-logo-black.png'

const Recycling = () => {

  const [infoChoice, setInfoChoice] = useState()

  const infoList = [
    {
      title: 'Plastique',
      info: 'Il existe différents types de plastiques. Tous les emballages plastiques alimentaires et d\'entretien sont recyclables.',
      list: ['blisters', 'sachets', 'film alimentaire', 'barquettes', 'bouteille', 'pot de yaourt'],
      binImage: DescriptionPlastique,
      imageRecycling: [LogoTriman]
    },
    {
      title: 'Carton/Papier',
      info: 'Le carton et le papier sont totalement recyclables.',
      list: ['carton', 'journal', 'papier', 'brique de lait', 'gobelet'],
      binImage: DescriptionCarton,
      imageRecycling: [LogoTriman, LogoMorbius]
    },
    {
      title: 'Métaux',
      info: 'Les emballages en métal sont recyclables.',
      list: ['conserves', 'canettes', 'boite de gâteaux', 'couvercle'],
      binImage: DescriptionMetaux,
      imageRecycling: [LogoTriman, LogoAlu, LogoAluTriangle]
    },
    {
      title: 'Verre',
      info: 'Le verre est recyclable à l\'exception de la vaisselle en verre.',
      list: ['bouteilles', 'pots', 'bocaux'],
      binImage: DescriptionVerre,
      imageRecycling: [LogoTriman]
    },
    {
      title: 'Autre',
      info: 'Les restes alimentaires, les dosettes à café, les articles d\'hygiène (coton, couches, essuie tout, masque ...), vaisselle en porcelaine ou jetable, pots en terre cuite ne sont pas recyclables.',
      list: [],
      binImage: LogoTrashMan,
      imageRecycling: []
    }
  ]

  console.log(infoList)

  const handleInfoChoice = (infoChoice) => {
    setInfoChoice(infoChoice)
  }

  return (

      <div className="RecyclingPage">
        <div className="background-decoration1"></div>
        <div className="background-decoration2"></div>
        <div className="background-decoration3"></div>

        <div className="RecyclingPage-desktop">

          <h2>Informations sur le recyclage</h2>
          <h4>Comment savoir si mon emballage est recyclable ?</h4>

          <div className="top-recycling-buttons">
            <button className={`btn ${infoChoice === 1 ? "btn-success" : "btn-outline-success"}`} onClick={() => handleInfoChoice(1)}>Plastique</button>
            <button className={`btn ${infoChoice === 2 ? "btn-success" : "btn-outline-success"}`} onClick={() => handleInfoChoice(2)}>Carton/Papier</button>
            <button className={`btn ${infoChoice === 3 ? "btn-success" : "btn-outline-success"}`} onClick={() => handleInfoChoice(3)}>Métaux</button>
            <button className={`btn ${infoChoice === 4 ? "btn-success" : "btn-outline-success"}`} onClick={() => handleInfoChoice(4)}>Verre</button>
            <button className={`btn ${infoChoice === 5 ? "btn-success" : "btn-outline-success"}`} onClick={() => handleInfoChoice(5)}>Autre</button>
          </div>

          <div  className="info-recycling-container">

          {infoChoice && 
          <>
            <div className="left-info-recycling-container">
              <h3>{infoList[infoChoice -1].title}</h3>
                <div className="left-info-recycling-image-container">
                {infoList[infoChoice -1].imageRecycling.map(element => (
                  <img src={element} alt='illustration recycling' />
                ))}
                </div>
              <p>{infoList[infoChoice -1].info}</p>
              {infoList[infoChoice -1].list && 
              <>
                <p>Liste non exhaustive des produits :<br />
                  <ul className="left-info-recycling-list">
                    {infoList[infoChoice -1].list.map(listU => (<li>{listU}</li>))}
                  </ul>
                </p>
              </>
              }
              <a href='https://www.triercestdonner.fr/guide-du-tri' rel="noopener noreferrer" target="_blank"><button className="btn btn-outline-success">Guide de tri officiel</button></a> 
            </div>

            <div className="right-info-recycling-container">
              {infoChoice && 
              <div className="right-info-recycling-image-container">
                <img src={infoList[infoChoice -1].binImage} alt='illustration recycling' />
              </div>
              }
            </div>
          </>
          }
          </div>

        </div>

        <div className="RecyclingPage-mobile">

          <div className="top-mobile-logo-container">
            <a href="/">
              <img src={Logo} className="top-mobile-logo" alt="logo mobile" />
            </a>
          </div>

          <h2>Informations sur le recyclage</h2>
          <h4>Comment savoir si mon emballage est recyclable ?</h4>

          <div className="top-recycling-buttons">
            <button className={`btn ${infoChoice === 1 ? "btn-success" : "btn-outline-success"}`} onClick={() => handleInfoChoice(1)}>Plastique</button>
            <button className={`btn ${infoChoice === 2 ? "btn-success" : "btn-outline-success"}`} onClick={() => handleInfoChoice(2)}>Carton/Papier</button>
            <button className={`btn ${infoChoice === 3 ? "btn-success" : "btn-outline-success"}`} onClick={() => handleInfoChoice(3)}>Métaux</button>
            <button className={`btn ${infoChoice === 4 ? "btn-success" : "btn-outline-success"}`} onClick={() => handleInfoChoice(4)}>Verre</button>
            <button className={`btn ${infoChoice === 5 ? "btn-success" : "btn-outline-success"}`} onClick={() => handleInfoChoice(5)}>Autre</button>
          </div>

          <div  className="info-recycling-container">

          {infoChoice && 
          <>
            <div className="top-info-recycling-container">
              <h3>{infoList[infoChoice -1].title}</h3>
                <div className="top-info-recycling-image-container">
                {infoList[infoChoice -1].imageRecycling.map(element => (
                  <img src={element} alt='illustration recycling' />
                ))}
                </div>
              <p>{infoList[infoChoice -1].info}</p>
              {infoList[infoChoice -1].list && 
              <>
                <p>Liste non exhaustive des produits :<br />
                  <ul className="top-inf-recycling-list">
                    {infoList[infoChoice -1].list.map(listU => (<li>{listU}</li>))}
                  </ul>
                </p>
              </>
              }
              <a href='https://www.triercestdonner.fr/guide-du-tri' rel="noopener noreferrer" target="_blank"><button className="btn btn-outline-success">Guide de tri officiel</button></a> 
            </div>
          </>
          }

        </div>

      </div>

    </div>

  );
}
 
export default Recycling;