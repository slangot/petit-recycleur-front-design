import React, { useEffect, useState } from "react";

import axios from "axios";
import Swal from "sweetalert2";

import Navbar from "../Navbar/Navbar";

import "./Contribute.css";

import ContributeImg from '../../assets/images/contribute-img.png'
import Logo from '../../assets/images/Le-petit-recycleur-logo-black.png'

const ContributePage = () => {

  const [recyclingBarcode, setRecyclingBarcode] = useState()
  const [recyclingStatus, setRecyclingStatus] = useState()
  const [certify, setCertify] = useState()

  // Axios call to get the data
  const handlePostData = async () => {
    try { 

      const currentData = {
        barcode: recyclingBarcode,
        recyclingStatus: recyclingStatus,
      }
      const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'swal-custom-btn swal-btn-success',
        cancelButton: 'swal-custom-btn swal-btn-cancel'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Confirmer le produit',
      html:
      `<p>Code barre: ${currentData.barcode}</p>` +
      `<p>Emballage recyclable: ${currentData.recyclingStatus ? 'Recyclable' : 'Non recyclable'}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Contribuer',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.isConfirmed) {

        const postData = async () => {
          const submitData = await axios.post('http://localhost:6000/packaging', {
            barcode: recyclingBarcode,
            recyclingStatus: recyclingStatus,
          }
          ).then(result => {
            if(result) {
              swalWithBootstrapButtons.fire(
                'Contribution envoyée !',
                'Merci pour votre contribution, vous permettez de rendre le monde meilleur.',
                'success'
              )
            } else {
              swalWithBootstrapButtons.fire(
                'Oups...',
                'Un problème est survenu lors de l\'envoi...',
                'error'
              )
            }
        }) 
      }
      postData()
    }
    })
  
    } catch(error) {
      console.log(error)
    }
  }

  const handleBarCode = (barcode) => {
    setRecyclingBarcode(barcode)
  }

  const handleStatus = (status) => {
    setRecyclingStatus(status)
  }

  const handleCertify = () => {
    
  }

  const handleSubmitMessage = () => {
    if(certify) {
      handlePostData()
    } else {

    }
  }


  

  return (

  <div className="ContributePage">
    <div className="ContributePage-decoration1"></div>
    <div className="ContributePage-decoration2"></div>
    <div className="ContributePage-decoration3"></div>

    <div className="ContributePage-desktop">

        <div className="left-info-container">
          <h3>Aidez nous en contribuant à améliorer notre base de données.</h3>
          <p>Remplissez le formulaire pour ajouter des informations sur un emballage.</p>
          <div className="contribute-img-container">
            <img src={ContributeImg} alt="contribute logo" />
          </div>
          <div className="left-info-buttons">
            <a href="/recycling"><button className="btn btn-outline-success">En savoir plus sur le recyclage.</button></a>
            <a target="_blank" rel="noopener noreferrer" href="https://www.triercestdonner.fr/guide-du-tri"><button className="btn btn_custom_brown">Voir le guide officiel du recyclage</button></a>
          </div>
        </div>

        <div className="right-form-container">
          <form>

            <div className="form-group">
              <label for="barCodeInput">Code barre :</label>
              <input type="number" className="form-control" id="barCodeInput" placeholder="30562991030386" onChange={(e) => handleBarCode(e.target.value)} />
            </div>
            <div className="status-buttons-container">
              <div className='form-check-radio'>
                <input className="form-check-input" type="radio" name="recyclingStatus" id="recyclable1" value="recyclable"  onClick={(e) => handleStatus(e.target.value)}/>
                <label className={recyclingStatus === 'recyclable' ? "form-check-label form-check-label-radio btn btn-success" : "form-check-label form-check-label-radio btn btn-outline-success"} for="recyclable1">
                  Recyclable
                </label>
              </div>
              <div className='form-check-radio'>
                <input className="form-check-input" type="radio" name="recyclingStatus" id="recyclable2" value="non recyclable" onClick={(e) => handleStatus(e.target.value)}/>
                <label className={recyclingStatus === 'non recyclable' ? "form-check-label form-check-label-radio btn btn-danger" : "form-check-label form-check-label-radio btn btn-outline-danger"} for="recyclable2">
                  Non recyclable
                </label>
              </div>
            </div>

            <div className="form-check">
              <input className="form-check-input custom-check-input" type="checkbox" id="certifyContact" onChange={(e) => handleCertify(e.target.value)} />
              <label className="form-check-label" for="certifyContact">Je confirme le contenu de mon message.</label>
            </div>

            <button type="submit" className="btn btn_custom_brown" onClick={() => handleSubmitMessage()}>Envoyer</button>

          </form>
        </div>
    

      </div>

      <div className="ContributePage-mobile">
        <div className="top-mobile-logo-container">
          <a href="/">
            <img src={Logo} className="top-mobile-logo" alt="logo mobile" />
          </a>
        </div>

        <h5>Contribuer</h5>
        
        <p>Aidez nous en contribuant à améliorer notre base de données.</p>
        <p><i>Remplissez le formulaire pour ajouter des informations sur un emballage.</i></p>

        <form>

            <div className="form-group">
              <label for="barCodeInput">Code barre :</label>
              <input type="number" className="form-control" id="barCodeInput" placeholder="30562991030386" onChange={(e) => handleBarCode(e.target.value)} />
            </div>
            <div className="status-buttons-container">
              <div className='form-check-radio'>
                <input className="form-check-input" type="radio" name="recyclingStatus" id="recyclable1" value="recyclable"  onClick={(e) => handleStatus(e.target.value)}/>
                <label className={recyclingStatus === 'recyclable' ? "form-check-label form-check-label-radio btn btn-success" : "form-check-label form-check-label-radio btn btn-outline-success"} for="recyclable1">
                  Recyclable
                </label>
              </div>
              <div className='form-check-radio'>
                <input className="form-check-input" type="radio" name="recyclingStatus" id="recyclable2" value="non recyclable" onClick={(e) => handleStatus(e.target.value)}/>
                <label className={recyclingStatus === 'non recyclable' ? "form-check-label form-check-label-radio btn btn-danger" : "form-check-label form-check-label-radio btn btn-outline-danger"} for="recyclable2">
                  Non recyclable
                </label>
              </div>
            </div>

            <div className="form-check form-check-certify">
              <input className="form-check-input custom-check-input" type="checkbox" id="certifyContact" onChange={(e) => handleCertify(e.target.value)} />
              <label className="form-check-label" for="certifyContact">Je confirme le contenu de mon message.</label>
            </div>

            <button type="submit" className="btn btn_custom_brown" onClick={() => handleSubmitMessage()}>Envoyer</button>

          </form>


      </div>

  </div>
  );
}
 
export default ContributePage;