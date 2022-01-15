import React, { useEffect, useState } from "react";

import axios from "axios";
import Quagga from '@ericblade/quagga2'; 

import Navbar from "../Navbar/Navbar";
import Scanner from "./Scanner";
import "./ScanPage.css";

import LoaderImg from '../../assets/images/Plant.gif'
import RecyclableImg from '../../assets/images/recyclable.png'
import NonRecyclableImg from '../../assets/images/cross.png'
import NotFound from '../../assets/images/detective.png'
import ScanImg from '../../assets/images/scanner-img.png'
import Scan2Img from '../../assets/images/scanner-2-img.png'
import Logo from '../../assets/images/Le-petit-recycleur-logo-black.png'

const ScanPage = () => {

  // states
  const [camera, setCamera] = useState(false)
  //const [codeBar, setCodeBar] = useState(false)
  //const [codeBarResult, setCodeBarResult] = useState(null)
  const [showScanButton, setShowScanButton] = useState(true)

  const [result, setResult] = useState(null)
  const [apiRes, setApiRes] = useState(null)
  const [responseStatus, setResponseStatus] = useState(null)
  //const [loading, setLoading] = useState(false)

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
    'fr:Verre'
  ]

  // Show/Hide the scan button
  const handleScanButton = () => {
    setShowScanButton(false)
  }

  // const handleSetCodeBar = () => {
  //   setCodeBar(true)
  // }

  // const handleCodeBarResult = (code) => {
  //   setCodeBarResult(code)
  // }

  const handleSetResult = (code) => {
    setResult(code)
  }

  // Convert the scanning number from Quagga and updating the result state
  const onDetected = result => {
    setResult(result);
  };

  // Axios call to get the data
  const getData = async () => {
    try { 
      const resData = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${result}.json`)
      .then(res => {
        console.log(res)
        console.log(res.data)
        console.log(res.data.status_verbose)
        console.log(res.data.status)

        // State changing into the response data
        setApiRes(res)

        // Checking for the response status, if the product has been found and then updating the responseStatus state
        // if(res.data.status === 'product not found' || res.data.status_verbose === 'no code or invalid code' || !res.data.product.packaging) {
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
      })
    } catch(error) {
      console.log(error)
    }
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

  const handleRetry = () => {
    setResult(null)
    //setCodeBarResult(null)
    setTimeout(() => {
      setCamera(true)
    }, 1000)
    
  }

  


  // When the result state changes we call the API to fetch datas
  useEffect(() => {
    if(result) {
      getData()
    }
  },[result])

  return (
<>
  <div className="ScanPage">
    <div className="ScanPage-decoration1"></div>
    <div className="ScanPage-decoration2"></div>
    <div className="ScanPage-decoration3"></div>
    <Navbar />
    <div className="ScanPage-desktop">
      <div className="left-info-container">
        <h2>Trouver votre produit</h2>
        <div className="left-info-buttons">
          <button className="btn btn-outline-success">Scanner</button>
          <button className="btn btn_custom_brown">Saisir code</button>
        </div>
      </div>
      <div className="right-img-container">
        <img src={ScanImg} alt='scan logo'/>
      </div>
    </div>



    <div className="ScanPage-mobile">
      <div className="top-info-container">
      <img src={Logo} className="top-mobile-logo" alt="logo mobile" />
        <h2>Trouver votre produit</h2>
        <div className="top-info-buttons">
          <button className="btn btn-outline-success">Scanner</button>
          <button className="btn btn_custom_brown">Saisir code</button>
        </div>
        <div className="scan-img-mobile-container">
          <img src={ScanImg} alt='scan logo'/>
        </div>

      </div>

    </div>
  </div>








{/*

    <div className="ScanPage">
      <Navbar />
      <section className="ScanPageContainer">
        <div className="container">
          {!result ?
            <div className="custom-row row gx-5 justify-content-center justify-content-lg-between">
              {camera ?
                <div className="col-12 col-lg-3">
                  <h4>Passer votre code barre pour le scanner</h4>
                  <img src={Scan2Img} className="img-fluid" alt="scan logo" />
                </div>
              // :
              // codeBar ?
              // <div className="col-12 col-lg-3">
              //     <h4>Entrez le code barre</h4>
              //     {/* <img src={Scan2Img} className="img-fluid" alt="scan logo" /> * /}
              //   </div>
              :
              <div className="col-12 col-lg-4">
                <h2 className="display-4 mb-4">Trouver votre produit</h2>
                {showScanButton ? 
                <div className="scan-choice-button">
                  <button className='btn btn-outline-success btn-lg to-scan-button' onClick={() => setCamera(true)}>Scanner</button> 
                  {/* <button className='btn btn-outline-success btn-lg to-scan-button' onClick={() => setCodeBar(true)}>Saisir code</button>  * /}
                </div>
                  :
                  <button className='btn btn-outline-success to-scan-button' onClick={() => handleReload()}>Scanner un autre produit</button>
                }
              </div>
              }
              
              {camera ? 
                <div className="col-12 col-lg-9 col-sm-8 col-md-6">
                  <div className='scan-camera'>
                    <div className="container">
                      <Scanner onDetected={onDetected} />
                    </div>
                  </div>
                </div>
                // :
                // codeBar ?
                // <div className="col-12 col-lg-9 col-sm-8 col-md-6">
                //   <input type='number' onChange={(e) => handleCodeBarResult(e.target.value)} />
                //   <button className='to-search-button' onClick={() => handleSetResult(codeBarResult)}>Rechercher</button>
                // </div>
                :
                <div className="col-sm-8 col-md-6">
                  <div className="px-sm-0"><img className="img-fluid scan-img" src={ScanImg} alt="scan logo" /></div>
                </div>
              }
              
            </div>
          : 
            (!responseStatus) ?
            <div className="custom-row row gx-5 align-items-center justify-content-center justify-content-lg-between">
              <div className="col-12 col-lg-5">
                <div className="px-sm-0">
                  <img className="img-fluid" src={NotFound} alt="scan logo" />
                </div>
              </div>
              <div className="col-sm-8 col-md-3 col-lg-7">
                <h2 className="display-4 lh-1 mb-4">Produit non trouvé</h2>
                <h4 className="lh-1 mb-2">Que faire ?</h4>
                <div className="d-flex justify-content-around mb-4">
                  <button className="btn btn-outline-success" onClick={() => handleRetry()}>
                    <p>Réessayer</p>
                    <i className="bi bi-arrow-counterclockwise scan-icons"></i>
                  </button>
                  {/* <button className="btn btn_custom_brown" onClick={handleSetCodeBar()}> * /}
                  <button className="btn btn_custom_brown">
                    <p>Entrez le code</p>
                    <i className="bi bi-pencil-square scan-icons"></i>
                  </button>
                  <a href="/contribute">
                    <button className="btn btn_custom_gold">
                      <p>Contribuer</p>
                      <i className="bi bi-folder-plus scan-icons"></i>
                    </button>
                  </a>
                </div>
                <p><i className="bi bi-exclamation-triangle-fill scan-icons scan-icons-danger"></i> Il se peut que votre produit ne soit pas alimentaire, ou qu'il ne figure pas encore dans nos données.</p>
              </div>
            </div>

            : responseStatus &&
            <>
            <div className='ScanPage-result-container column gx-5 align-items-center justify-content-center justify-content-lg-between'>
            
              <h2><u>RESULTATS :</u></h2>
              <div className='ScanPage-result-container row gx-5 align-items-center justify-content-center justify-content-lg-between'>
              <div className="col-lg-5 col-md-5 col-sm-12">
                <h3>Code Barre : </h3>
                <h4>{result}</h4>
                {apiRes && 
                <>
                {apiRes.data.product.image_packaging_small_url ?
                  <img src={apiRes.data.product.image_packaging_small_url || apiRes.data.product.image_front_small_url} alt='produit' />
                  : apiRes.data.product.image_front_small_url ? <img src={apiRes.data.product.image_front_small_url || apiRes.data.product.image_front_small_url} alt='produit' />
                  : null}
                </>
                }
              </div>
              {apiRes &&
              <div className="result-container col-lg-5 col-md-5 col-sm-6">
                {(apiRes.data.product.packaging_tags || apiRes.data.product.packaging) && recyclingName.some(element => (apiRes.data.product.packaging_tags.includes(element) || apiRes.data.product.packaging.includes(element))) ?
                  <>
                    <div className='result-status-image mb-4 mt-2'>
                      <img src={RecyclableImg} alt='recyclable' />
                    </div>
                    <h3 className='result-status-recyclable'><strong>Recyclable</strong>*</h3>
                    <p>Pour plus d'informations consulter <a target="_blank" rel="noopener noreferrer" href="https://www.triercestdonner.fr/guide-du-tri">triercestdonner.fr/guide-du-tri</a></p>
                  </>
                : <>
                    <div className='result-status-image mb-4 mt-2'>
                      <img src={NonRecyclableImg} alt='unrecyclable' />
                    </div>
                    <h3 className='result-status-unrecyclable'><strong>Non Recyclable</strong></h3>
                  </>
                }
              </div>
                }
            </div>
            </div>
            <div className="button-container d-flex justify-content-around mt-5 mb-1">
            <button className="btn-new-action btn btn-outline-success" onClick={() => handleRetry()}>
              Scanner un autre code
            </button>
            {/* <button className="btn btn_custom_brown" onClick={handleSetCodeBar()}> * /}
            <button className="btn-new-action btn btn_custom_brown">
              Informations sur le recyclage
            </button>
            <a href="/contribute">
              <button className="btn-new-action btn btn_custom_gold">
                Contribuer au projet
              </button>
            </a>
          </div>
              
          </>
        }


        </div>

        </section>

      </div>
      */}
      </>
  );
}
 
export default ScanPage;