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
        Swal.fire({
          icon: 'success',
          title: 'Message bien envoyé !',
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oups...',
          text: 'Un problème est survenu lors de l\'envoi du message.',
        })
      }
  }) 

}

const handleSubmitMessage = () => {
    if(certify) {
      if(object !== 'Choisissez un objet') {
        postData()
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Veuillez sélectionner un objet pour le message',
          timer: 2000
        })
      }

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Veuillez cocher la confirmation',
        timer: 2000
      })
    }
  }

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

            <div class="form-group">
              <label for="objectContact">Objet :</label>
              <select class="form-control" id="objectContact" onChange={(e) => handleObject(e.target.value)}>
                <option>Choisissez un objet</option>
                <option>Recommandations</option>
                <option>Problème recyclage</option>
                <option>Problème contribution</option>
                <option>Collaboration</option>
                <option>Autre</option>
              </select>
            </div>

            {/* <div class="form-group">
              <label for="exampleFormControlInput1">Email address</label>
              <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com">
            </div> */}

            <div class="form-group">
              <label for="textContact">Message :</label>
              <textarea class="form-control" id="textContact" rows="5" onChange={(e) => handleText(e.target.value)}></textarea>
            </div>

            <div class="form-check">
              <input class="form-check-input custom-check-input" type="checkbox" id="certifyContact" onChange={(e) => handleCertify(e.target.value)} />
              <label class="form-check-label" for="certifyContact">Je confirme le contenu de mon message</label>
            </div>

            <button type="submit" class="btn btn-success" onClick={() => handleSubmitMessage()}>Envoyer</button>

          </form>

        </div>

    </div>
   );
}
 
export default Contact;