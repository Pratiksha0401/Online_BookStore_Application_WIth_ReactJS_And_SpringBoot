import React from 'react';
import Img from '../../assests/home – 2/Image 12.png'
import './order.scss'
import Footer from '../footer/footer';
import Header from '../header/header';
import Button from "@material-ui/core/Button";
import { Link, withRouter } from "react-router-dom";
import CartService from '../services/cart-service';

class Order extends React.Component {

    constructor(props){
        super(props)
        this.state={
            cartArray:[]
        }
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
                //console.log("ordered",response.data.data[i])
                if(response.data.data[i].status === "ordered"){
                    cartArrayRes.push(response.data.data[i])
                }
            }
            this.setState({ cartArray: cartArrayRes })
        })

    }


    render() {
        return (
            <>
                <Header />
                <div className="WishlistMain">
                    <div className="order-topconatinerO">
                        <div className="orderUrlO">
                            <Button className="hometitleO"><Link className="headerlink" to="">Home  / </Link></Button><Button className="ordertitleO"> My Order</Button>
                            {/* <p className="hometitleO">Home  / </p><p className="ordertitleO"> My Order</p> */}
                        </div>

                    </div>

                    <div className="Card-ContainerO">
                        <table>
                            <tbody>
                            <tr>
                                <th>  </th>
                                <th>  </th>
                            </tr>
                            {this.state.cartArray.map((order)=>
                             <tr>
                             <td className="inner-boxO">
                                 <div className="card-infoO">
                                     <img src={order.bookData.bookImage }></img>
                                     <div className="card-dataO">
                                         <p className="BookNameO">{order.bookData.bookName}</p>
                                         <p className="AuthorNameO">{order.bookData.bookAuthor}</p>
                                         <div className="priceBoxO">
                                             <p className="PriceNameO">Rs.{order.bookData.bookPrice * order.quantity}</p>
                                             <p className="ActualPriceNameO"></p>
                                         </div>
                                     </div>

                                 </div>
                                 <div className="card-orderO">

                                     <p className="order-detailsO"> <span className="dotO">&#8228;</span> Order place on 31 July</p>
                                 </div>
                             </td>

                         </tr>
                            
                            )}
                           
                            </tbody>
                        </table>


                    </div>
                </div>
                <div className = "footer-setupd">
                    <Footer />
                </div>

            </>
        );
    }
}
export default withRouter(Order);
