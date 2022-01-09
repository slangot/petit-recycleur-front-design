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

const ScanPage = () => {

  // states
  const [camera, setCamera] = useState(false)
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
  }


  // When the result state changes we call the API to fetch datas
  useEffect(() => {
    if(result) {
      getData()
    }
  },[result])

  return (
    <div className="ScanPage">
      <Navbar />
      <section className="ScanPageContainer">
        <div className="container px-5">
          {!result ?
            <div className="row gx-5 align-items-center justify-content-center justify-content-lg-between">
              <div className="col-12 col-lg-5">
                <h2 className="display-4 lh-1 mb-4">Scanner votre produit</h2>
                {showScanButton ? 
                  <button className='btn btn-outline-success to-scan-button' onClick={() => setCamera(true)}>Scanner</button> 
                  :
                  <button className='btn btn-outline-success to-scan-button' onClick={handleReload}>Scanner un autre produit</button>
                }
              </div>
              <div className="col-sm-8 col-md-6">
              {camera ? 
                <div className='ScanPage-container'>
                  <div className="container">
                    <Scanner onDetected={onDetected} />
                  </div>
                </div>
                :
                <div className="px-5 px-sm-0"><img className="img-fluid" src={ScanImg} alt="scan logo" /></div>
              }
              </div>
            </div>
          : 
            (!responseStatus) ?
            <div className="row gx-5 align-items-center justify-content-center justify-content-lg-between">
              <div className="col-12 col-lg-5">
                <div className="px-5 px-sm-0">
                  <img className="img-fluid" src={NotFound} alt="scan logo" />
                </div>
              </div>
              <div className="col-sm-8 col-md-6 col-lg-7">
              <h2 className="display-4 lh-1 mb-4">Produit non trouvé</h2>
              <h4 className="lh-1 mb-2">Que faire ?</h4>
              <div className="d-flex justify-content-around mb-4">
                <button className="btn btn-outline-success">
                  <p>Réessayer</p>
                  <i class="bi bi-arrow-counterclockwise scan-icons"></i>
                </button>
                <button className="btn btn_custom_brown">
                  <p>Entrez le code</p>
                  <i class="bi bi-pencil-square scan-icons"></i>
                </button>
                <button className="btn btn_custom_gold">
                  <p>Contribuer</p>
                  <i class="bi bi-folder-plus scan-icons"></i>
                </button>
              </div>
              <p><i class="bi bi-exclamation-triangle-fill scan-icons scan-icons-danger"></i> Il se peut que votre produit ne soit pas alimentaire, ou qu'il ne figure pas encore dans nos données.</p>
              </div>
            </div>



            : responseStatus &&
            <div className="row gx-5 align-items-center justify-content-center justify-content-lg-between">
            <div className="col-12 col-lg-5">
            <div className='ScanPage-result-container'>
              <h2>Resultats :</h2>
              <div className='result-barcode'>
                <h3>Code Barre : </h3>
                <h4>{result}</h4>
              </div>
              {apiRes &&
              <div className='result-product-status-container'>
                <div>
                  <div className='result-product'>
                      <div className='result-image'>
                      {apiRes.data.product.image_packaging_small_url ?
                        <img src={apiRes.data.product.image_packaging_small_url || apiRes.data.product.image_front_small_url} alt='produit' />
                        : apiRes.data.product.image_front_small_url ? <img src={apiRes.data.product.image_front_small_url || apiRes.data.product.image_front_small_url} alt='produit' />
                        : null}
                      </div>
                  </div>
                  <div className='result-status'>
                    {(apiRes.data.product.packaging_tags || apiRes.data.product.packaging) && recyclingName.some(element => (apiRes.data.product.packaging_tags.includes(element) || apiRes.data.product.packaging.includes(element))) ?
                    <div>
                      <div className='result-status-image'>
                        <img src={RecyclableImg} alt='recyclable' />
                      </div>
                      <h3 className='result-status-recyclable'>Emballage <strong>Recyclable</strong></h3>
                    </div>
                  : <div>
                      <div className='result-status-image'>
                        <img src={NonRecyclableImg} alt='unrecyclable' />
                      </div>
                      <h3 className='result-status-unrecyclable'>Emballage <strong>Non Recyclable</strong></h3>
                    </div>
                  }
                  </div>
                  </div>
                </div>
                }
            </div>
            </div>
            </div>
        }


        </div>



        {/* Show the scan button if we havn't clicked yet */}
        {showScanButton ? 
        <button className='to-scan-button' onClick={() => setCamera(true) }>Scanner</button> 
        :
        <button className='to-scan-button' onClick={handleReload}>Scanner un autre produit</button>
        }
        {/*  */}
        {camera && 
          <div className='ScanPage-container'>
            <div className="container">
              <Scanner onDetected={onDetected} />
            </div>
          </div>
        }

        {result &&
          (!responseStatus) ?
          <div className='ScanPage-result-container not-found-container'>
            <div className='not-found-img'>
              <img src={NotFound} alt='not found' />
            </div>
            <h3>Produit non trouvé</h3>
            <p>Vous pouvez réessayer</p>
            <p>Il se peut que votre produit ne soit pas alimentaire, ou qu'il ne figure pas encore dans nos données.</p>
          </div>
          : responseStatus &&
          <div className='ScanPage-result-container'>
            <h2>Resultats :</h2>
            <div className='result-barcode'>
              <h3>Code Barre : </h3>
              <h4>{result}</h4>
            </div>
            {apiRes &&
            <div className='result-product-status-container'>
              <div>
                <div className='result-product'>
                    <div className='result-image'>
                    {apiRes.data.product.image_packaging_small_url ?
                      <img src={apiRes.data.product.image_packaging_small_url || apiRes.data.product.image_front_small_url} alt='produit' />
                      : apiRes.data.product.image_front_small_url ? <img src={apiRes.data.product.image_front_small_url || apiRes.data.product.image_front_small_url} alt='produit' />
                      : null}
                    </div>
                </div>
                <div className='result-status'>
                  {(apiRes.data.product.packaging_tags || apiRes.data.product.packaging) && recyclingName.some(element => (apiRes.data.product.packaging_tags.includes(element) || apiRes.data.product.packaging.includes(element))) ?
                  <div>
                    <div className='result-status-image'>
                      <img src={RecyclableImg} alt='recyclable' />
                    </div>
                    <h3 className='result-status-recyclable'>Emballage <strong>Recyclable</strong></h3>
                  </div>
                : <div>
                    <div className='result-status-image'>
                      <img src={NonRecyclableImg} alt='unrecyclable' />
                    </div>
                    <h3 className='result-status-unrecyclable'>Emballage <strong>Non Recyclable</strong></h3>
                  </div>
                }
                </div>
                </div>
              </div>
              }
          </div>
        }
    </section>
    {result &&
      !apiRes &&
        // <div className='loader-container'>
        //   <div className='loader-container-bg'></div>
        //   <div className='loader-image-container'>
        //     <img src={LoaderImg} alt="loader" />
        //   </div>
        // </div>
        <div>
          <div className='bg-opacity'></div>
          <div className='lds-ring'>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
    }
      </div>
  );
}
 
export default ScanPage;