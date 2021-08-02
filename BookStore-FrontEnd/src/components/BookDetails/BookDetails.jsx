import book from "../../assests/home – 2/Image 11@2x.png";
import "./BookDetails.scss";
import React from "react";
//import logo from '../../assests/book.png';
import { withRouter } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Header from '../header/header'
import BookStoreService from "../services/book-serivce";
import WishListService from "../services/wishListService";
import Star from "../../assests/star_white_24dp.svg";
import { Link } from "react-router-dom";
import CartService from "../services/cart-service";
import { Snackbar, IconButton } from '@material-ui/core';

class AfterHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookDetailData: [],
      isLogin: false,
      isCart: false,
      isWish: false,
      cartDataArray: [],
      wishDataArray: [],
      snackbarOpen: false,
      snackbarmsg: ''
    }
    // console.log(this.props.match.params.id)
    this.addBookToWishList = this.addBookToWishList.bind(this)
    this.getCartListData = this.getCartListData.bind(this)
    this.getWishList = this.getWishList.bind(this)
  }

  snackbarClose = (event) => {
    this.setState({
      snackbarOpen: false
    })
  }

  componentDidMount = () => {
    let id = this.props.match.params.id;
    if (id !== undefined && id !== '') {
      this.getBookById(id);
    }
    this.getCartListData();
    this.getWishList();
  }

  getCartListData = () => {
    let tokenId = localStorage.getItem("token")
    new CartService().getCartList(tokenId).then(response => {
      let getCartArray=[]
      for(var i=0;i< response.data.data.length;i++){
        if(response.data.data[i].status!=="ordered"){
          getCartArray.push(response.data.data[i])
        }
      //console.log("cart", response.data.data)
      this.setState({ cartDataArray: getCartArray})
      }
      //console.log("cart list array", this.state.cartArray)
    })
    
  }

  getWishList = () => {
    let tokenId = localStorage.getItem("token")
    new WishListService().getWishList(tokenId).then(response => {
      this.setState({ wishDataArray: response.data.data })
      //console.log("wish list array", this.state.wishDataArray)
    })
  }

  addBookToWishList = () => {
    let tokenId = localStorage.getItem("token")
    let wishData = this.state.wishDataArray.find((elem) => this.state.bookDetailData.bookId === elem.bookData.bookId);
    //console.log(wishData)
    if (wishData) {
      this.setState({
        isLogin: true,
        isWish: true
      })
      this.setState({
        snackbarOpen: true,
        snackbarmsg: "Book Already Present In WishLIst",
      })
    } else {
      new WishListService().addBookToWishList(this.state.bookDetailData.bookId, tokenId).
        then(response => {
          //console.log(response.data.data)
          this.setState({
            isLogin: true,
            isWish: true
          })
          // this.props.history.push("/Wishlist")
        }).catch(err => {
          this.setState({ isLogin: false })
          this.props.history.push("/loginWishlist")
        })
    }
  }
  goToWishlist = () => {
    let user = localStorage.getItem('token');
    if (user) {
      this.props.history.push("/Wishlist")
    }

  }

  getBookById = (id) => {
    new BookStoreService().getBookById(id).then(response => {
      this.setState({ bookDetailData: response.data.data })
      //console.log(this.state.bookDetailData)

    }).catch(err => {
      console.log(err)
    })
  }

  addToCart = () => {
    let tokenId = localStorage.getItem("token")
    let cartData = this.state.cartDataArray.find((elem) => this.state.bookDetailData.bookId === elem.bookData.bookId);
    //console.log("cart status add to cart", cartData.status)
    if (cartData) {
      let quantity = cartData.quantity + 1
      new CartService().updateCartQuantity(cartData.cartId, tokenId, quantity).then(response => {
        let res = response.data;
        console.log("cart item update quantity", res.data)
        this.setState({
          isLogin: true,
          isCart: true
        })
      }).catch(err => {
        console.log("not updated quantity");
      })
    } else{
      new CartService().addBookToCart(this.state.bookDetailData.bookId, tokenId).then(response => {
        let res = response.data
        //console.log(res.data)
        this.setState({
          isLogin: true,
          isCart: true
        })
      }).catch(err => {
        this.setState({ isLogin: false })
        this.props.history.push("/loginWishlist")
      })
    }
  }

  goToMyCartlist = () => {
    let user = localStorage.getItem('token');
    if (user) {
      this.props.history.push("/MyCart")
    }
  }
  render() {
    return (
      <>
        <Header />
        <div className="rectangle">
          <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            open={this.state.snackbarOpen}
            autoHideDuration={2000}
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
        <div className="Mainbody">
          <div className="topbarBD">
            <p className="homebackBD"><Link className="homebackBDlink" to="">Home /</Link></p><p className="detailsBD">BookDetails</p>
          </div>
          <div className="cart">

            <div className="book">
              <img src={this.state.bookDetailData.bookImage} alt="dnet" className="book-image" />
            </div>
            <div className="addwishbuttons">
              <div className="addbag-button">
                <Button onClick={!this.state.isLogin ? this.addToCart : this.goToMyCartlist} style={{ maxWidth: '80%', maxHeight: '50px', minHeight: '30px', marginLeft: '8%', backgroundColor: '#A03037', color: '#FFFFFF' }} variant="contained" color="primary" className="add-bag" size="large">
                  {!this.state.isCart ? 'Add To Cart' : 'Go to cart'}
                </Button>
              </div>

              <div className="whishlist-button">
                <Button onClick={!this.state.isLogin ? this.addBookToWishList : this.goToWishlist} style={{ maxWidth: '80%', maxHeight: '50px', minHeight: '30px', marginLeft: '10%', backgroundColor: '#333232', color: '#FFFFFF' }} variant="contained" color="secondary" className="whislist" size="large">
                  {!this.state.isWish ? 'Add To Wishlist' : 'Go to wishlist'}
                </Button>
              </div>
            </div>
          </div>

          <div className="book-info">
            <div className="Book-name">
              <b>{this.state.bookDetailData.bookName}</b>
            </div>
            <div className="author">
              by {this.state.bookDetailData.bookAuthor}<br />
            </div>

            <div>
              <Box display="flex" flexDirection="row">
                <Box className="rate1 ">
                  <Box className="rate-no1">{this.state.bookDetailData.rating}</Box>
                  <img className="star1" src={Star} />
                </Box>
                {/* <Box className="quant">{this.state.bookCount}</Box> */}
              </Box>
            </div>
            <div className="book-price">
              <strong className="actualpriceBD">Rs.{this.state.bookDetailData.bookPrice} </strong>
              <del className="oldpriceBD">Rs.{this.state.bookDetailData.bookOldPrice}</del>
            </div>

          </div>

          <div className="book-details">

            <hr className="above-line" />
            <ul>
              <li>Book Detail</li>
            </ul>
            {this.state.bookDetailData.bookDescription}
            <hr className="below-line" />
          </div>

        </div>
      </>
    );
  }
}

export default withRouter(AfterHome);