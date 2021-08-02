import React from 'react';
import remove from '../../assests/remove.svg'
import Img from '../../assests/home – 2/Image 10.png'
import './wishlist.scss'
import Footer from '../footer/footer'
import Header from '../header/header';
import Button from "@material-ui/core/Button";
import { Link, withRouter } from "react-router-dom";
import WishListService from '../services/wishListService';
import { Snackbar,IconButton } from '@material-ui/core';

class WishList extends React.Component {
    constructor(props){
        super(props);
        this.state={
            wishListArray:[],
            snackbarOpen: false,
            snackbarmsg: ''
        }
    }

    componentDidMount=()=>{
        this.getWishList()
    }

    snackbarClose = (event) => {
        this.setState({ 
            snackbarOpen: false })
    }

    getWishList=()=>{
        let tokenId = localStorage.getItem("token")
        new WishListService().getWishList(tokenId).then(response=>{
            this.setState({ wishListArray: response.data.data})
            console.log("wish list array",this.state.wishListArray)
        })
    }

    removeBook=(id)=>{
        //console.log(id)
        let tokenId = localStorage.getItem("token")
        new WishListService().deleteWishList(id,tokenId).then(response=>{
            this.setState({
                snackbarOpen: true,
                snackbarmsg: 'Deleted Sucessfully',
            }) 
            this.getWishList();      
            }).catch(error=>{
                this.setState({                  
                    snackbarOpen: true,            
                    snackbarmsg: error.response.data.message,        
                })
                
        })
    }
    render() {

        return (
            <>
                <Header />
                <div className="rectangled">
                        <Snackbar
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            open={this.state.snackbarOpen}
                            autoHideDuration={5000}
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
                <div className="WishlistMain">
                    <div className="order-topconatiner">
                        <div className="orderUrl">
                            <Button className="hometitle"> <Link className="headerlink" to="">HOME /</Link></Button><Button className="ordertitle"> My WishList</Button>
                            {/* <Button className="hometitle" onClick="">Home  / </Button><Button className="ordertitle"> My WishList</Button> */}
                        </div>

                    </div>


                    <div className="Card-Container">
                        <table>
                        <tbody>
                            <tr className="HeadingWishList">
                                <th className="HeadingData"> MY WISHLIST <p className="WishlistCount"> ({this.state.wishListArray.length})</p> </th>
                                <th>  </th>
                            </tr>
                            {this.state.wishListArray.map((wishListItem)=>(
                                <tr key={wishListItem.bookData.bookId}>
                                <td className="inner-box" >
                                    <div className="card-info">
                                        <img src={wishListItem.bookData.bookImage}></img>
                                        <div className="card-data">
                                            <p className="BookName">{wishListItem.bookData.bookName}</p>
                                            <p className="AuthorName">{wishListItem.bookData.bookAuthor}</p>
                                            <div className="priceBox">
                                                <p className="PriceName">Rs.{wishListItem.bookData.bookPrice}</p>
                                                <p className="ActualPriceName">{wishListItem.bookData.bookOldPrice}</p>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="card-order">

                                        <div className="order-details"><img className="removedata" src={remove} onClick={()=>this.removeBook(wishListItem.wishListId)}></img></div>
                                    </div>
                                </td>
                                </tr>

                            ))}
                            </tbody>
                        </table>


                    </div>
                </div>
                <div className = "footer-setup">
                    <Footer />
                </div>

            </>
        );
    }
}
export default WishList;
