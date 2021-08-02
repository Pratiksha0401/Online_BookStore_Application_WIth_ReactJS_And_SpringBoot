import React from 'react';
import './loginWishlist.scss';
import photo from '../../assests/Page-1.svg'
import Header from '../header/header'
import {Link} from 'react-router-dom'

function LoginWishlist(){
    return (
        <>
        <Header />
        <div className="main">
              
              <div className="content1">
                  <div className="Please1">
                    <b>PLEASE LOG IN</b>
                  </div>
                  <p className="para5">Login to view you items in your whishlist/Cart</p>
                  <img className="center-image1" src={photo} alt="" />
                  <button className="LoginSignup-button1"><Link className="LSButton" to="/Login">LOGIN/SIGNUP</Link></button>


              </div>
            </div>
            </>
    );
}

export default LoginWishlist;