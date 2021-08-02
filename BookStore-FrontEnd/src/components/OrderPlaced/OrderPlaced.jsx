import React, { Component } from 'react'
import congo from '../../assests/congo.png'


import './OrderPlaced.scss'
import Header from '../header/header'
import Footer from '../footer/footer'
import { Link } from 'react-router-dom'
import OrderBookAxiosService from '../services/orderbook_service'

export default class Orderplaced extends Component {

  constructor(){
    super()
    this.state={
      orderId: ''
    }

  }

  componentDidMount=()=>{
    this.getOrderId()
  }

  getOrderId=()=>{
    let tokenId=localStorage.getItem("token")
    new OrderBookAxiosService().getOrderId(tokenId).then(response=>{
      this.setState({orderId: response.data.data})

    })
  }
    render() {
        return (
            <>
            <Header/>
        <div className="order-placed">
            
            <div className="congo-image">
            <img  src={congo} alt="" />

            </div>
            <div className="order-content">

            <p className="order-content1">hurray!!! your order is confirmed </p>
            <p className="order-content2"> the order id is  #{this.state.orderId} save the order id for </p>
            <p className="order-content3">  further communication.. </p>

            </div>
            
            <div className="order-table">
            <table className="rtable">
  <tr>
    <th className="th">Email Us</th>
    <th className="th">Contact Us</th>
    <th className="th">Address</th> 
  </tr>
<tr>
      <td className="td" width="30%">admin@bookstore.com</td>
    <td className="td" width="30%">+91 8163475881</td>
    <td className="td" width="40%">42, 14th Main, 15th Cross, Sector 4 ,opp to BDA complex, near Kumarakom restaurant, HSR Layout, Bangalore 560034</td>
  </tr>
</table>

            </div>

             <div className="continue-shopping-button">
             <button className="shopping-button"><Link className="LSButton1" to="">CONTINUE SHOPPING</Link></button>
             
             </div>

            </div>
            <div >
            <Footer />
            </div>
            </>
        )
    }
}