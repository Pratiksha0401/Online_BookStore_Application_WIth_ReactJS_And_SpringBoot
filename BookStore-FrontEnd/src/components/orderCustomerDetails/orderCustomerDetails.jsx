import React, { Component } from 'react'
import './orderCustomerDetails.scss'
import UserService from '../services/user-service';

const initialValue = {
    name: '',
    mobileNum: '',
    city: '',
    state: '',
    address: '',
    cartArray: [],
    defaultAddress: {},
    isAdding: true
}

class OrderCustomerDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            mobileNum: '',
            city: '',
            state: '',
            address: '',
            cartArray: [],
            defaultAddress: {},
            isAdding:true            

        }
        //console.log("order summary",props)
        this.addAddress = this.addAddress.bind(this)
       // this.reset = this.reset.bind(this);
    }
    continue = () => {
        this.props.isContinue()
    }
    componentDidMount = () => {
        this.getAddressData();
    }
    getAddressData = () => {
        //let cartArrayDetails=[]
        let tokenId = localStorage.getItem("token")
        new UserService().getAddressData(tokenId).then(response => {
            let res = response.data
            console.log("address", res.data)
            this.setState({
                cartArray: res.data,
                defaultAddress: res.data[res.data.length - 1]
            })

        })

    }
    addressClick = () => {
        this.reset();
        this.setState({ isAdding: false })
    }

    addAddress = () => {
        let tokenId = localStorage.getItem("token")
        this.setState({ isAdding: true })

        let addressObject = {
            fullName: this.state.name,
            city: this.state.city,
            mobNo: this.state.mobileNum,
            address: this.state.address,
            state: this.state.state
        }

        console.log("object", addressObject)
        new UserService().addAddress(tokenId, addressObject).then(response => {

            console.log(response.data.data)

        }).catch(err => {

        })

    }
    onChangeHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    cancel = () => {
        this.setState({ isAdding: true })
    }

    reset = () => {
        console.log("init", initialValue);
        this.setState({ defaultAddress: '' });
    }
    render() {

        return (
            <>
                <div className="AddressMainCart">
                    <div className="customerdetailsdo">

                        <div className="middlebox">
                            <div className="personalformdo">
                                <div className="add-button">
                                    {this.state.isAdding ? <button className="add-address-buttond" onClick={this.addressClick}>
                                        Add New Address</button> : <button className="add-address-buttond" onClick={this.addAddress}>
                                        Save</button>}
                                    {this.state.isAdding ? '' : <button className="add-address-buttond" onClick={this.cancel}>Cancel</button>}
                                </div>

                                <form className="nameform">
                                    <div className="fielddata" >
                                        <label className="personal-labeld" for="name">Full Name</label>

                                        {this.state.isAdding ? <input className="personal-inputdo" type="text" id="name"
                                            value={this.state.defaultAddress.fullName || ''} autoComplete="off" /> : <input className="personal-inputdo" name="name" type="text" id="name"
                                                onChange={this.onChangeHandler} autoComplete="off" />}

                                    </div>
                                    <div className="fielddata" >
                                        <label className="personal-labeld" for="number">Mobile Number</label>


                                        {this.state.isAdding ? <input className="personal-inputdo" type="tel" id="number"
                                            value={this.state.defaultAddress.mobNo || ''} /> : <input className="personal-inputdo" name="mobileNum" type="tel" id="number"
                                                onChange={this.onChangeHandler} />}

                                    </div>
                                </form>
                            </div>

                            <div className="addressformd">

                                <h2 className="heading-workd"> 1.WORK</h2>



                                <form>
                                    <div>
                                        <label className="address-textd">Address</label>

                                        {this.state.isAdding ? <input className="address-inputdo" type="text" id="address" value={this.state.defaultAddress.address || ''} />
                                            : <input className="address-inputdo" name="address" type="text" id="address" onChange={this.onChangeHandler} />}


                                        <label className="city-fielddo" >
                                            <span className="spando">City/Town</span><br></br>

                                            {this.state.isAdding ? <input className="city-inputdo" type="text" id="city" value={this.state.defaultAddress.city || ''} />
                                                : <input className="city-inputdo" name="city" type="text" id="city" onChange={this.onChangeHandler} />}

                                        </label>
                                        <label >
                                            <span className="state-fielddo">State</span><br></br>

                                            {this.state.isAdding ? <input className="state-inputdo" type="text" id="state" value={this.state.defaultAddress.state || ''} />
                                                : <input className="state-inputdo" type="text" name="state" id="state" onChange={this.onChangeHandler} />}

                                        </label>
                                    </div>


                                </form>

                            </div>
                        </div>


                    </div>

                    <div>
                        <button className="continueClickButton" onClick={this.continue}>Continue</button>
                    </div>

                </div>
            </>
        )
    }
}

export default OrderCustomerDetails