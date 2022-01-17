import React, { useState, useEffect } from 'react';
import Swal from "sweetalert2";
import axios from "axios";

import './Contact.css'

import Logo from '../../assets/images/Le-petit-recycleur-logo-black.png'

const Contact = () => {

  const [object, setObject] = useState()
  const [text, setText] = useState()
  const [certify, setCertify] = useState(false)

  const handleObject = (object) => {
    setObject(object)
  }

  const handleText = (text) => {
    setText(text)
  }

  const handleCertify = () => {
    setCertify(!certify)
  }

  const postData = async () => {
    const submitData = await axios.post('http://localhost:3000/contact', {
      object: object,
      text: text,
      email: ''
    }
    ).then(result => {
      if(result) {
        // Swal.fire({
        //   icon: 'success',
        //   title: 'Message bien envoyé !',
        // })
        console.log(result)
      } else {
        // Swal.fire({
        //   icon: 'error',
        //   title: 'Oups...',
        //   text: 'Un problème est survenu lors de l\'envoi du message.',
        // })
        console.error('erroooooooooor')
      }
  }) 

}

const handleSubmitMessage = (e) => {
  e.preventDefault()
    if(certify) {
      if(object !== 'Choisissez un objet' && object) {
        console.log('coucou')
        postData()
      } else {
        // Swal.fire({
        //   icon: 'error',
        //   title: 'Veuillez sélectionner un objet pour le message',
        //   timer: 2000
        // })
        console.log('noooo pas d\'objet')
      }

    } else {
      // Swal.fire({
      //   icon: 'error',
      //   title: 'Veuillez cocher la confirmation',
      //   timer: 2000
      // })
      console.log('pas de certif laaaaaaaaaaaa')
    }
  }

  useEffect(() => {
    console.log('object : ' + object)
  }, [])

  return (
    <div className="ContactPage">
    <div className="ContactPage-decoration1"></div>
    <div className="ContactPage-decoration2"></div>
    <div className="ContactPage-decoration3"></div>

      <div className="ContactPage-desktop">

        <div className="ContactPage-mobile">
          <div className="top-mobile-logo-container">
            <a href="/">
              <img src={Logo} className="top-mobile-logo" alt="logo mobile" />
            </a>
          </div>
        </div>
        
          <form>
            <h2>Nous contacter</h2>

            <div className="form-group">
              <label htmlFor="objectContact">Objet :</label>
              <select className="form-control" id="objectContact" onChange={(e) => handleObject(e.target.value)}>
                <option value="Choisissez un objet">Choisissez un objet</option>
                <option value="Recommandations">Recommandations</option>
                <option value="Problème recyclage">Problème recyclage</option>
                <option value="Problème contribution">Problème contribution</option>
                <option value="Collaboration">Collaboration</option>
                <option value="Autre">Autre</option>
              </select>
            </div>

            {/* <div className="form-group">
              <label htmlFor="exampleFormControlInput1">Email address</label>
              <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com">
            </div> */}

            <div className="form-group">
              <label htmlFor="textContact">Message :</label>
              <textarea className="form-control" id="textContact" rows="5" onChange={(e) => handleText(e.target.value)}></textarea>
            </div>

            <div className="form-check">
              <input className="form-check-input custom-check-input" type="checkbox" id="certifyContact" onChange={(e) => handleCertify(e.target.value)} />
              <label className="form-check-label" htmlFor="certifyContact">Je confirme le contenu de mon message</label>
            </div>

            <button type="submit" className="btn btn-success" onClick={(e) => handleSubmitMessage(e)}>Envoyer</button>

          </form>

        </div>

    </div>
   );
}
 
export default Contact;