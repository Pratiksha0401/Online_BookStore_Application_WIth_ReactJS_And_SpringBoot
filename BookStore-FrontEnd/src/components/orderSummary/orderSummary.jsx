import React, { Component } from 'react'
import './orderSummary.scss'
import Book from '../../assests/home – 2/Image 14.png'
import { Link } from 'react-router-dom'
import OrderBookAxiosService from '../services/orderbook_service'
import CartService from '../services/cart-service'
import BookStoreService from '../services/book-serivce'

class OrderSummary extends Component {
    constructor(props) {
        super(props)
        console.log(props)
    }

    orderPlaced = () => {
        let tokenId = localStorage.getItem("token")
        //console.log(tokenId)
        new OrderBookAxiosService().orderBook(tokenId).then(response => {
            let res = response.data;
            //console.log("cart ordered",res)
        }).catch(error => {

        })
        let status = "ordered";
        for (var i = 0; i < this.props.cartArray.length; i++) {
            //console.log(this.props.cartArray[i])
            //console.log(this.props.cartArray[i].cartId)
            new CartService().updateCartStatus(this.props.cartArray[i].cartId, tokenId, status)
                .then(response => {
                    let res = response.data;
                    //console.log("ordered status", res)
                }).catch(err => {

                })
        for (var i = 0; i < this.props.cartArray.length; i++) {
            let qty = (this.props.cartArray[i].bookData.bookQuantity)-( this.props.cartArray[i].quantity)
            new BookStoreService().updateBookQuantity(tokenId,this.props.cartArray[i].bookData.bookId,
                                                        qty)
                .then(response=>{
                    let res=response.data
                    console.log("update quantity", res.data)
                })
        }
            
        }


    }

    render() {

        let orderTotal = 0;
        this.props.cartArray.map((orderSummaryArray) => {
            orderTotal = orderTotal + (orderSummaryArray.quantity * orderSummaryArray.bookData.bookPrice)
        })
        return (
            <>

                <div className="OrderCard-Container">
                    <table className="SummaryTable">
                        <tbody>
                            <tr className="HeadingOrder">

                                <th>  </th>
                            </tr>
                            {this.props.cartArray.map((orderSummaryArray) => (
                                <tr key={orderSummaryArray.bookData.bookId}>
                                    <td className="inner-Obox" >
                                        <div className="card-Oinfo">
                                            <img src={orderSummaryArray.bookData.bookImage}></img>
                                            <div className="card-Odata">
                                                <p className="BookName">{orderSummaryArray.bookData.bookName}</p>
                                                <p className="AuthorName">{orderSummaryArray.bookData.bookAuthor}</p>
                                                <div className="priceBox">
                                                    <p className="PriceName">{orderSummaryArray.bookData.bookPrice} * {orderSummaryArray.quantity}</p>
                                                    <p className="ActualPriceName"></p>
                                                </div>
                                            </div>

                                        </div>

                                    </td>
                                </tr>
                            ))}
                            {/* {this.props.cartArray.map((orderSummaryArray) => ( */}

                            <div className="cartsummaryfooter">
                                <div className="TotalSummary">
                                    <div className="TotalpriceSummary"><p><b>Total price</b></p>
                                        <label className="totalpricedata" type="text"><p className="totalpricedatap">Rs. {orderTotal}</p></label>
                                    </div>
                                </div>

                            </div>
                            {/* ))} */}

                        </tbody>
                    </table>
                    <button className="OrderclickButton" onClick={this.orderPlaced}><Link className="HomeButton" to="/orderplaced">Checkout</Link></button>


                </div>

            </>
        )
    }
}

export default OrderSummary