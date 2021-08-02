import './App.css';
import Reset from './components/reset/reset'
import UserAuth from './components/UserAuth/UserAuth'
import Forgot from './components/forgotPassword/ResetPassword'
import Footer from './components/footer/footer'
import Header from './components/header/header'
import Verify from './components/verify/verify'
import HomePage from './components/homePage/homePage'
// import Cart from './components/cart_details/cart/cart'
import CustomerDetails from './components/customerDetails/customerdetails'
import Order from './components/order/order'
import WishList from './components/wishlist/wishlist'
// import Address from './components/cart_details/Address/Address'
// import Summary from './components/cart_details/orderSummary/ordersummary'
import LoginWishlist from './components/loginWishlist/loginWishlist'
import {
  BrowserRouter as Router, Switch, Route, Redirect
} from "react-router-dom";
import Orderplaced from './components/OrderPlaced/OrderPlaced';
import BookDetails from './components/BookDetails/BookDetails';
import MyCart from './components/MyCart/myCart'
import OrderSummary from './components/orderSummary/orderSummary';
import OrderCustomerDetails from './components/orderCustomerDetails/orderCustomerDetails';
function App() {
  return (
    <div className="App">
      <Router>
        
        <Switch>
        <Route exact path="/orderCustomerDetails" ><OrderCustomerDetails/></Route>
        <Route exact path="/orderSummary" ><OrderSummary/></Route>
        <Route exact path="/mycart" ><MyCart/></Route>
        <Route exact path="/bookdetails"><BookDetails /></Route>
        <Route exact path="/orderplaced"><Orderplaced /></Route>
          <Route exact path="/loginWishlist"><LoginWishlist /></Route>
        <Route exact path="/order" ><Order /></Route>
          <Route exact path="/wishlist"><WishList/></Route>
        <Route exact path="/login" ><UserAuth /></Route>
          <Route exact path="/reset/:token"><Reset/></Route>
          <Route exact path="/header"><Header /> </Route>
        <Route exact path="/footer" ><Footer /></Route>
         <Route exact path = "/forgot" component = {Forgot} /> 
        <Route exact path = "/customerDetails"><CustomerDetails/></Route>
        <Route exact path="/verify/:token" ><Verify /></Route>
        <Route exact path="/bookdetails/:id" ><BookDetails /></Route>
        <Route exact path="" ><HomePage/></Route>

        
        </Switch>
      </Router>
    </div>
  );
}

export default App;
