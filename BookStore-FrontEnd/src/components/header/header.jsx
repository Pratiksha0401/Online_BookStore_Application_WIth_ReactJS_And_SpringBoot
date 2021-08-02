import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Typography from "@material-ui/core/Typography";

import ShoppingCart from '../../assests/shopping_cart_black_24dp.svg'
import { Link, withRouter } from "react-router-dom";
import './header.scss'
import Badge from "@material-ui/core/Badge";
import LocalGroceryStoreOutlinedIcon from '@material-ui/icons/LocalGroceryStoreOutlined';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import Dialog from "@material-ui/core/Dialog";
import LoginPage from "../UserAuth/UserAuth";
import DialogContent from "@material-ui/core/DialogContent";
//import { Link } from 'react-router-dom';
import bookIcon from '../../assests/education.svg'
import UserAuth from '../UserAuth/UserAuth'
import Wishlist from '../../assests/wishlist-icon-19.jpg'
import ButtonGroup from '@material-ui/core/ButtonGroup';
import BookStoreService from "../services/book-serivce";

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchText1: "",
            visiblityValueOfLogin: 'hidden',
            visiblityOfDialogBox: false,
            visibilityOfCloseIcon: 'hidden',
            isLoggedIn: false,

        }

        this.serach = this.serach.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.mycart = this.mycart.bind(this)
    }

    handleChange = (event) => {
        this.setState({ searchText1: event.target.value })
        console.log(this.state.searchText1)
        if (event.target.value === '' || event.target.value.trim() === '') {

            new BookStoreService().getBooksFromDatabase(0).then(response => {
                let res = response.data
                this.props.handleSearchData(res.data)

            }).catch(err => {

            })
        } else {
            this.serach(event.target.value);
        }
    }

    handleLoginBoxVisiblity = (event) => {
        if (`${this.state.visiblityValueOfLogin}` === "hidden") {
            this.setState({ visiblityValueOfLogin: "visible" })
            return;
        }
        if (`${this.state.visiblityValueOfLogin}` === "visible") {
            this.setState({ visiblityValueOfLogin: "hidden" })

        }
    }


    handleDialogueBoxVisiblity = (event) => {
        this.setState({ visiblityOfDialogBox: true, visibilityOfCloseIcon: "visible" })
    }

    handleLogoutBoxVisibility = () => {
        this.setState({ isLoggedIn: false, visiblityValueOfLogin: 'hidden' })
        localStorage.removeItem('userData')
        localStorage.removeItem('token')
        window.location.reload(true)
    }

    setClickFlag = (flag) => {
        this.setState({ visiblityOfDialogBox: flag, visibilityOfCloseIcon: "visible" })
    }

    componentDidMount() {
        this.isLoggedIn();
    }

    isLoggedIn = () => {
        let user = localStorage.getItem('userData');
        if (user) {
            this.setState({
                isLoggedIn: true
            })
        }

        if (user == "null" || user == "undefined") {
            this.setState({
                isLoggedIn: false
            })
        }
    }

    serach = (serachValue) => {
        new BookStoreService().serachByBookName(serachValue).then(response => {
            let res = response.data
            this.props.handleSearchData(res.data)
        }).catch(err => {

        })
    }

    mycart=()=>{
        {this.state.isLoggedIn ?this.props.history.push("/MyCart"):this.props.history.push("/loginWishlist")}
        
    }

    render() {
        const url = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
        return (
            <div>

                {!this.state.isLoggedIn ?
                    <Card className="loginsignupcard" style={{
                        boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
                        visibility: this.state.visiblityValueOfLogin,
                    }} variant="outlined">
                        <CardContent><Typography className="welcome"><b>Welcome</b></Typography>
                            <p color="textSecondary" gutterBottom
                                className="gutterbottomfont">To access account and manage orders</p>

                            <Button className="loginorsignupbutton">
                                <Link className="signuploginbutton" to="/Login"> LOGIN/SIGNUP</Link></Button>

                            <hr />

                            <div className="buttons">
                                <div className="buttondata">
                                    <CardGiftcardIcon className="imgorder" />
                                    <div>
                                        <button className="myorders" >
                                            <Link className="headerlink" to=""> My Orders</Link></button><br />
                                    </div>
                                </div>
                                <div className="buttondata">
                                    <Link className="headerlink" to="/loginWishlist"><img src={Wishlist} className="wishlistimg" /></Link>

                                    <button className="wishlist">

                                        <Link className="headerlink" to="/loginWishlist">Wishlist</Link></button>
                                </div>
                            </div>

                        </CardContent>
                    </Card>
                    :
                    <Card className="loginsignupcard" style={{
                        boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
                        visibility: this.state.visiblityValueOfLogin,
                    }} variant="outlined">
                        <CardContent><Typography
                        >Hello, {localStorage.getItem('userData')}</Typography>
                            <hr />
                            <div>
                                <PermIdentityIcon className="wishlistimg" /><Link className="headerlink" to="/CustomerDetails">
                                    My Profile</Link>
                            </div>
                            <div>
                                <Typography color="textSecondary"
                                    gutterBottom><Link className="headerlink" to="/Order"><CardGiftcardIcon
                                    />My Orders</Link>
                                </Typography>
                            </div>
                            <div className="buttondata">
                                <img src={Wishlist} className="wishlistimg" />

                                <button className="wishlist1"><Link className="headerlink" to="/Wishlist">

                                    My Wishlist</Link></button>
                            </div>

                            <Button className="loginorsignupbutton"
                                onClick={this.handleLogoutBoxVisibility}>LOGOUT</Button>
                        </CardContent>
                    </Card>
                }

                <AppBar position="fixed" style={{ backgroundColor: "rgb(150, 0, 0)" }}>
                    <Toolbar className="maintoolbar">
                        <div className="logo">
                            <img src={bookIcon} className="bookIcon" />
                        </div>
                        <Typography className="title" variant="h6" noWrap>
                            <Link className="HomeButton" to="">
                            Bookstore</Link>
                        </Typography>
                        <div className="search" >
                            <div className="searchIcon">
                                <SearchIcon />
                            </div>
                            <div className="searchText">
                                <InputBase
                                    placeholder="Search ..."
                                    value={this.state.searchText1}
                                    onChange={this.handleChange}
                                /></div>
                        </div>



                        <div className="addtocarticon1">

                            <PermIdentityIcon type="radio" className="userIcon" value="profile" onClick={this.handleLoginBoxVisiblity} />
                            <Typography className="profileName" noWrap>
                                {!this.state.isLoggedIn ? 'Profile' : localStorage.getItem('userData')}
                            </Typography>
                            {/* <Typography>
                            
                             {localStorage.getItem('userData')}</Typography> */}
                        </div>




                        <div className="addtocarticon" onClick={this.mycart}>

                            <LocalGroceryStoreOutlinedIcon type="radio" className="carticon" />
                            
                            <Typography className="cartName">
                            
                                Cart
                            </Typography>
                            
                            {/* <img src={ShoppingCart} color="secondary" className="badgeclass" className="carticon"/> */}


                        </div>


                    </Toolbar>
                </AppBar>
                <Dialog className="maindialoguebox" aria-labelledby="customized-dialog-title"
                    open={this.state.visiblityOfDialogBox}>
                    <DialogContent className="dialoguecontent" id="customized-dialog-title">
                        <LoginPage getClickFlag={this.setClickFlag} />
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}
export default withRouter(Header)
