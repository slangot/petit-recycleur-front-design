import React, { useEffect, useState } from "react";

import axios from "axios";
import Quagga from '@ericblade/quagga2'; 

import Scanner from "./Scanner";

import "./ScanPage.css";

import LoaderImg from '../../assets/images/Plant.gif'
import RecyclableImg from '../../assets/images/recyclable.png'
import NotFound from '../../assets/images/detective.png'
import ScanImg from '../../assets/images/scanner-img.png'
import Logo from '../../assets/images/Le-petit-recycleur-logo-black.png'
import CodeSearch from '../../assets/images/barcodesearch.png'
import NonRecyclableImg2 from '../../assets/images/non-recyclage-2.png'
import RecyclingLoader from '../../assets/images/Dbkl.gif'

const ScanPage = () => {

  // states
  const [camera, setCamera] = useState(false)
  const [keyboard, setKeyboard] = useState(false)
  const [codeBarResult, setCodeBarResult] = useState(null)
  const [showScanButton, setShowScanButton] = useState(true)

  const [result, setResult] = useState(null)
  const [apiRes, setApiRes] = useState(null)
  const [responseStatus, setResponseStatus] = useState(null)

  // recycling validate names
  const recyclingName = [
    'pete-1', 'carton',
    'bouteille-en-aluminium',
    'fr-boite-en-carton',
    'fr-brique-en-carton',
    'bouteille-plastique-bouchon',
    'bouteille',
    'fr-bouteille-en-plastique',
    'fr-bouchon-en-plastique',
    'boite-en-carton',
    'conserve',
    'fr-couvercle-en-metal',
    'stuck',
    'en:pet-polyethylene-terephthalate',
    'en-pet-bottle',
    'en-glass-bottle',
    'en:glass-bottle',
    'en:aluminium',
    'en:tetra-pack',
    '41-alu',
    'tetra-pak',
    'verre',
    'en:glass',
    'glass',
    'bocal',
    'jar',
    'en:jar',
    'glas',
    'fr-verre',
    'fr:Verre',
    'en:plastic',
    'plastique',

  ]

  // Show/Hide the scan button
  const handleScanButton = () => {
    setShowScanButton(false)
  }

  const handleSetKeyboard = () => {
    setKeyboard(true)
  }

   const handleCodeBarResult = (code) => {
    setCodeBarResult(code)
  }

  const handleSetResult = (code) => {
    setResult(code)
  }

  // Convert the scanning number from Quagga and updating the result state
  const onDetected = result => {
    setResult(result);
  };

  // Axios call to get the data
  const getData = async () => {
    // try {
    //   const resDataBD = await axios.get(`http://localhost:4000/packaging/${result}`)
    //   .then(res => {
    //     console.log(res)
    //   })
    // } catch (error) {
    //   console.log(error)
    // }

    // if(!apiRes) {

      try { 
        const resData = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${result}.json`)
        .then(res => {

          // State changing into the response data
          setApiRes(res)

          // Checking for the response status, if the product has been found and then updating the responseStatus state
          if(res.data.status === 0 || !res.data.product.packaging) {
            setResponseStatus(false)
          } else {
            setResponseStatus(true)
          }

          // Then we stop the camera
          Quagga.stop()
          setCamera(false)
          setShowScanButton(false)
          //setCodeBar(false)
          console.log('responseStatus : ' + responseStatus)
        })
      } catch(error) {
        console.log(error)
      }
    // }
  }

  // Function to reload the page
  const handleReload = () => {
    window.location.reload()
  }

  // Function to stop and close the camera
  const handleStopCamera = () => {
    // Then we stop the camera
    Quagga.stop()
    setCamera(false)
    setShowScanButton(false)
    //setCodeBar(false)
  }

  // When the result state changes we call the API to fetch datas
  useEffect(() => {
    if(result) {
      getData()
    }
  },[result])
  

  return (

  <div className="ScanPage">
    <div className="background-decoration1"></div>
    <div className="background-decoration2"></div>
    <div className="background-decoration3"></div>

    <div className="ScanPage-desktop">

    {(!camera && !keyboard &&!result) ?
      <>
        <div className="left-info-container">
          <h2>Trouver votre produit</h2>
          <div className="left-info-buttons">
            <button className="btn btn-success" onClick={() => setCamera(true)}>Scanner</button>
            <button className="btn btn_custom_brown" onClick={() => handleSetKeyboard(codeBarResult)}>Saisir code</button>
          </div>
        </div>

        <div className="right-img-container">
          <img src={ScanImg} alt='scan logo'/>
        </div>
      </>
      : null
      }

      {keyboard && !result &&
        <>
          <div className="left-keyboard-container">
            <h2>Entrer le numéro du code barre de votre emballage</h2>
            <div className="left-keyboard-input">
              <input type="number" placeholder="302329000485" onChange={(e) => handleCodeBarResult(e.target.value)}/>
              <button className="btn btn_custom_full_brown"onClick={() => handleSetResult(codeBarResult) }>Rechercher</button>
            </div>
          </div>

          <div className="right-keyboard-container">
            <img src={CodeSearch} alt='search logo'/>
          </div>
        </>
      }

      {camera &&
        <>
          <div className="left-camera-container">
            <h2>Scanner le code barre</h2>
            <div className="left-camera-img">
              <img src={RecyclingLoader} alt='scanner'/>
            </div>
          </div>

          <div className="right-camera-container">
            <Scanner onDetected={onDetected} />
          </div>
        </>
      }

      {result &&
        // !apiRes ?
        // <div className="dataLoader">
        //   <img src={LoaderImg} alt="loader" />
        // </div>
        // :
        <>
          {!responseStatus ?
          <>
            <div className="left-result-not-found-container">
              <h3>Votre produit N°{result}</h3>
              <h4>n'a pas pu être trouvé &#128533;</h4>
              <div className="left-result-not-found-buttons">
                <p>Il se peut que votre produit ne soit pas encore dans nos données</p>
                <button className="btn btn-outline-success" onClick={() => handleReload()}>Recommencer</button>
                <a href="/contribute"><button className="btn btn-outline-primary">Contribuer</button></a>
                <a href="/recycling"><button className="btn btn_custom_brown">Informations</button></a>

              </div>
            </div>
            <div className="right-result-not-found-container">
                <img src={NotFound} alt="not found" />
            </div>
          </>
          : responseStatus &&
          <>
            <div className="left-result-found-container">
              <h3>Votre produit N°{result}</h3>
              <h4>a bien été trouvé</h4>
              {apiRes &&
                <div className="left-result-found-img">
                {apiRes.data.product.image_packaging_small_url ?
                    <img src={apiRes.data.product.image_packaging_small_url || apiRes.data.product.image_front_small_url} alt='produit' />
                    : apiRes.data.product.image_front_small_url ? <img src={apiRes.data.product.image_front_small_url || apiRes.data.product.image_front_small_url} alt='produit' />
                    : null
                }
                </div>
              }
              <button className="btn btn-outline-success" onClick={handleReload}>Chercher un autre produit</button>
              <a href="/contact"><button className="btn btn_custom_brown">Signaler un problème ?</button></a>
            </div>
            <div className="right-result-found-container">
            {(apiRes.data.product.packaging_tags || apiRes.data.product.packaging) && recyclingName.some(element => (apiRes.data.product.packaging_tags.includes(element) || apiRes.data.product.packaging.includes(element))) ?
                <div className="right-result-found-info">
                  <img src={RecyclableImg} alt='recyclable' />
                  <h3 className='right-result-status-recyclable'>Emballage <strong>Recyclable</strong></h3>
                  <p>Pour plus d'informations consulter <br/><a target="_blank" rel="noopener noreferrer" href="https://www.triercestdonner.fr/guide-du-tri">www.triercestdonner.fr/guide-du-tri</a></p>
                </div>
              : <div className="right-result-found-info">
                  <img src={NonRecyclableImg2} alt='unrecyclable' />
                  <h3 className='right-result-status-unrecyclable'>Emballage <strong>Non Recyclable</strong></h3>
                </div>
              }
            </div>
          </>
          }
        </>
      }
    </div>



    <div className="ScanPage-mobile">

      <div className="top-mobile-logo-container">
        <a href="/">
          <img src={Logo} className="top-mobile-logo" alt="logo mobile" />
        </a>
      </div>

      {(!camera && !keyboard && !result) ?
      <div className="info-container">
        <h2>Trouver votre produit</h2>
        <div className="top-info-buttons">
          <button className="btn btn-success" onClick={() => setCamera(true)}>Scanner</button>
          <button className="btn btn_custom_brown" onClick={() => handleSetKeyboard()}>Saisir code</button>
        </div>
        <div className="bottom-info-scan-img-mobile-container">
          <img src={ScanImg} alt='scan logo'/>
        </div>
      </div>
      : null}

      {keyboard && !result &&
        <>
          <div className="top-keyboard-container">
            <h2>Entrer le numéro du code barre de votre emballage</h2>
            <div className="top-keyboard-input">
              <input type="number" placeholder="302329000485" onChange={(e) => handleCodeBarResult(e.target.value)}/>
              <button className="btn btn_custom_full_brown" onClick={() => handleSetResult(codeBarResult)}>Rechercher</button>
            </div>
          </div>

          <div className="bottom-keyboard-container">
            <img src={CodeSearch} alt='search logo'/>
          </div>
        </>
      }

      {camera &&
        <>
          <div className="top-camera-container">
            <h2>Scanner le code barre</h2>
            <p><i>Un problème d'affichage ? Vous pouvez tout de même scannez votre code barre</i></p>
          </div>

          <div className="bottom-camera-container">
            <Scanner onDetected={onDetected} />
          </div>
        </>
      }


      {result &&
        <>
          {!responseStatus ?
          <>
            <div className="top-result-not-found-container">
              <h3>Votre produit N°{result}</h3>
              <h4>n'a pas pu être trouvé &#128533;</h4>
              <div className="top-result-not-found-buttons">
                <p><i>Il se peut que votre produit ne soit pas encore dans nos données</i></p>
                <button className="btn btn-outline-success" onClick={() => handleReload()}>Recommencer</button>
                <a href="/contribute"><button className="btn btn-outline-primary">Contribuer</button></a>
                <a href="/info"><button className="btn btn_custom_brown">Informations</button></a>

              </div>
            </div>
            <div className="bottom-result-not-found-container">
                <img src={NotFound} alt="not found" />
            </div>
          </>
          : responseStatus &&
          <>
            <div className="top-result-found-container">
              <h3>Votre produit N°{result}</h3>
              <h4>a bien été trouvé</h4>
              {apiRes &&
                <div className="bottom-result-found-img">
                {apiRes.data.product.image_packaging_small_url ?
                    <img src={apiRes.data.product.image_packaging_small_url || apiRes.data.product.image_front_small_url} alt='produit' />
                    : apiRes.data.product.image_front_small_url ? <img src={apiRes.data.product.image_front_small_url || apiRes.data.product.image_front_small_url} alt='produit' />
                    : null
                }
                </div>
              }
            </div>
            <div className="bottom-result-found-container">
            {(apiRes.data.product.packaging_tags || apiRes.data.product.packaging) && recyclingName.some(element => (apiRes.data.product.packaging_tags.includes(element) || apiRes.data.product.packaging.includes(element))) ?
                <div className="bottom-result-found-info">
                  <img src={RecyclableImg} alt='recyclable' />
                  <h3 className='bottom-result-status-recyclable'><strong>Recyclable</strong></h3>
                  <p>Pour plus d'informations consulter <br/><a target="_blank" rel="noopener noreferrer" href="https://www.triercestdonner.fr/guide-du-tri">www.triercestdonner.fr/guide-du-tri</a></p>
                </div>
              : <div className="bottom-result-found-info">
                  <img src={NonRecyclableImg2} alt='unrecyclable' />
                  <h3 className='bottom-result-status-unrecyclable'><strong>Non Recyclable</strong></h3>
                </div>
              }
              <div className="bottom-result-container">
                <button className="btn btn-outline-success" onClick={handleReload}>Chercher un autre produit</button>
                <a href="/contact"><button className="btn btn_custom_brown">Signaler une erreur ?</button></a>
                </div>
            </div>
          </>
          }
        </>
      }

      </div>

  </div>
  );
}
 
export default ScanPage;