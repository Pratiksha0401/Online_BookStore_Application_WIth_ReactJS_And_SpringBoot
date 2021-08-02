import React from 'react';
import './myCart.scss'
import Header from '../header/header';
import { Button } from '@material-ui/core';
import { Link, withRouter } from "react-router-dom";
import CartService from '../services/cart-service';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import { Snackbar, IconButton } from '@material-ui/core';
import OrderCustomerDetails from '../orderCustomerDetails/orderCustomerDetails';
import OrderSummary from '../orderSummary/orderSummary';

class MyCart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cartArray: [],
            //quantityValue: this.state.cartArray.quantity
            quantityValue: 1,
            snackbarOpen: false,
            snackbarmsg: '',
            isPlaceOrder: false,
            isContinue: false,
            
            

        }
        this.increment = this.increment.bind(this);
        this.updateQuantity = this.updateQuantity.bind(this);
        this.getCartList = this.getCartList.bind(this);
    }
    snackbarClose = (event) => {
        this.setState({
            snackbarOpen: false
        })
    }

    componentDidMount = () => {
        this.getCartList()
    }

    getCartList = () => {
        //console.log("cart list array", this.state.cartArray)
        let tokenId = localStorage.getItem("token")

        new CartService().getCartList(tokenId).then(response => {
            //console.log("my cart", response.data.data[0].status)

            let cartArrayRes=[]
            for (var i = 0; i < response.data.data.length; i++) {
                //console.log("ordered",response.data.data[i].status)
                if(response.data.data[i].status !== "ordered"){
                    cartArrayRes.push(response.data.data[i])
                }
            }
            this.setState({ cartArray: cartArrayRes })
        })

    }

    increment = (cartId) => {
        let cartItemDetail = this.state.cartArray.find((elem) => cartId === elem.cartId);
        //console.log(cartItemDetail);        
        if (cartItemDetail) {
            let quantity = cartItemDetail.quantity
            //console.log(quantity);           
            quantity = quantity + 1
            //console.log("selected qty",quantity);   
            //console.log("book qty",cartItemDetail.bookData);   
            if (cartItemDetail.bookData.bookQuantity < quantity) {
                this.setState({
                    snackbarOpen: true,
                    snackbarmsg: "Book Quantity cannot be incremented"
                })
            } else {
                this.updateQuantity(cartId, quantity);
            }
        } else {
            this.setState({
                snackbarOpen: true,
                snackbarmsg: "Book Not Found"
            })
        }
    }
    placeOrder = (event) => {
        this.setState({ isPlaceOrder: true })
    }

    decrement = (cartId) => {
        let cartItemDetail = this.state.cartArray.find((elem) => cartId === elem.cartId);
        //console.log(cartItemDetail);   
        if (cartItemDetail) {
            let quantity = cartItemDetail.quantity
            //console.log(quantity);           
            quantity = quantity - 1
            if (quantity < 1) {
                this.setState({
                    snackbarOpen: true,
                    snackbarmsg: "Book Quantity cannot be 0"
                })
            } else {
                this.updateQuantity(cartId, quantity);
            }
        } else {
            this.setState({
                snackbarOpen: true,
                snackbarmsg: "Book Not Found"
            })
        }

    }

    removeCart = (id) => {
        let tokenId = localStorage.getItem("token")

        //console.log(id)
        new CartService().deleteCart(id, tokenId).then(response => {
            let res = response.data;
            this.setState({
                snackbarOpen: true,
                snackbarmsg: 'Removed Sucessfully',
            })
            this.getCartList();
        }).catch(error => {
            this.setState({
                snackbarOpen: true,
                snackbarmsg: error.response.data.message,
            })

        })
    }
    continue = () => {
        this.setState({ isContinue: true })
    }

    updateQuantity = (cartId, quantity) => {
        //console.log("cartId",cartId)
        let tokenId = localStorage.getItem("token")
        new CartService().updateCartQuantity(cartId, tokenId, quantity).then(res => {
            //console.log("quantity",res.data.data)
            this.getCartList();
        }).catch(err => {
        })
    }
  
    
    render() {

        return (
            <div>
                <Header />
                <div className="rectangled">
                    <Snackbar
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        open={this.state.snackbarOpen}
                        autoHideDuration={1000}
                        onClose={this.snackbarClose}
                        message={<span id="message-id">{this.state.snackbarmsg}</span>}
                        action={[
                            <IconButton
                                key="close"
                                arial-label="Close"
                                color="inherit"
                                onClick={this.snackbarClose}
                            >×</IconButton>

                        ]}
                    />
                </div>
                <div className="cartMain">
                    <div className="order-topconatiner">
                        <div className="orderUrl">
                            <Button className="hometitle"> <Link className="headerlink" to="">HOME /</Link></Button><Button className="ordertitle"> My Cart</Button>                            {/* <Button className="hometitle" onClick="">Home  / </Button><Button className="ordertitle"> My WishList</Button> */}
                        </div>

                    </div>

                    <div className="Card-Container">
                        <table>
                            <tbody>
                                <tr className="HeadingWishList">
                                    <th className="HeadingData"> MY Cart <p className="WishlistCount"> ({this.state.cartArray.length})</p> </th>
                                    <th>  </th>
                                </tr>
                                {this.state.cartArray.map((cartListItem) => (
                                    <tr key={cartListItem.cartId}>
                                        <td className="inner-box" >
                                            <div className="card-info">
                                                <img className="ImageCart" src={cartListItem.bookData.bookImage}></img>
                                                <div className="card-data">
                                                    <p className="BookName">{cartListItem.bookData.bookName}</p>
                                                    <p className="AuthorName">{cartListItem.bookData.bookAuthor}</p>
                                                    <div className="priceBox">
                                                        <p className="PriceName">Rs.{cartListItem.bookData.bookPrice}</p>
                                                        <p className="ActualPriceName">{cartListItem.bookData.bookOldPrice}</p>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="increment-decrement">
                                                <button className="minus-plus" onClick={() => this.decrement(cartListItem.cartId)} value={cartListItem.cartId}>
                                                    <RemoveCircleOutlineIcon />
                                                </button>
                                                <input type="number" className="number" value={cartListItem.quantity} />
                                                <button className="minus-plus" onClick={() => this.increment(cartListItem.cartId)} value={cartListItem.cartId}>
                                                    <AddCircleOutlineIcon />
                                                </button>
                                                <button className="remove" onClick={() => this.removeCart(cartListItem.cartId)}>Remove</button>

                                            </div>



                                        </td>
                                    </tr>

                                ))}
                            </tbody>
                        </table>
                        <div className='place-order-button'>

                            {this.state.cartArray.length>0?<Button variant="contained" color="primary" onClick={this.placeOrder}>
                                Place order
                            </Button>:""}

                        </div>


                    </div>
                    <div className="secondbox">

                        <div className="heading1do">
                            <h3 className="ch2"> Customer Details  </h3>
                            {this.state.isPlaceOrder ? < OrderCustomerDetails cartArray={this.state.cartArray} isContinue={this.continue} /> : ""}
                        </div>

                    </div>
                    <div className="secondbox">
                        <div className="heading1do">
                            <h3 className="ch2"> Order Summary</h3>
                            {this.state.isContinue ? <OrderSummary cartArray={this.state.cartArray} /> : ""}
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(MyCart);