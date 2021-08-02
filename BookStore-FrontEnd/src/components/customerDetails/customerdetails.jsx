import React, { Component } from 'react'
import './customerdetails.css'
import Header from '../header/header'
import UserService from '../services/user-service';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

export default class CustomerDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            FullName: "",
            EmailId: "",
            phoneNo: "",
            isEdit: false,
            isUpdate: false,
            address: "",
            city: "",
            state: "",
            addressArray:[],
            defaultAddress:[]
        }
        this.updateUser = this.updateUser.bind(this);
    }

    componentDidMount = () => {
        this.getUserData();
        this.getAddressData();
    }

    onChangeHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    edit = (event) => {
        this.setState({
            isEdit: true
        })
        return this.state.isEdit;
    }
    edit2 = (event) => {
        this.setState({
            isUpdate: true
        })
        return this.state.isUpdate;
    }
    Cancel1 = (event) => {
        this.setState({
            isEdit: false
        })
        return this.state.isEdit;
    }
    Cancel2 = (event) => {
        this.setState({
            isUpdate: false
        })
        return this.state.isUpdate;
    }

    updateUser = (e) => {
        let object = {
            fullName: this.state.FullName,
            phoneNumber: this.state.phoneNo
        }
        //console.log(object);
        let token = localStorage.getItem("token")
        new UserService().updateUser(object, token).then(response => {
            let res = response.data;

        }).catch(err => {

        })
        this.setState({isEdit:false})
    }

    getUserData = () => {
        let token = localStorage.getItem("token")
        new UserService().getUesrData(token).then(response => {
            let res = response.data;
            this.setState({
                FullName: res.data.fullName,
                phoneNo: res.data.phoneNumber
            })
        })

    }

    getAddressData = () => {
        let token = localStorage.getItem("token")
        new UserService().getAddressData(token).then(response => {
            let res = response.data;
            //console.log(res)
            //this.setState({})
            console.log(res.data)
            this.setState({
                addressArray: res.data[res.data.length - 1],
                defaultAddress: res.data[res.data.length - 1],
                city: res.data.city,
                 state: res.data.state

            })
            console.log("new",this.state.addressArray)
        })
    }
    render() {
        return (
            <>
                <Header />
                <div className="topod">
                    <div className="order-topconatinerot">
                        <div className="orderUrlot">
                            <Button className="hometitle"> <Link className="headerlink" to="">Home /</Link></Button><Button className="ordertitle"> Profile</Button>                            {/* <Button className="hometitle" onClick="">Home  / </Button><Button className="ordertitle"> My WishList</Button> */}
                        </div>

                    </div>
                </div>

                <div className="customerdetailsd">
                    <div className="heading1d">
                        <h2> Personal Details  </h2>
                        {/* <span className="edit-button1d" onClick={!this.state.isEdit ? this.edit : this.Cancel1}>
                            {!this.state.isEdit ? 'Edit' : 'Cancel'}</span>
                        {!this.state.isEdit ? '' : <button className="save-buttond" onClick={this.updateUser}>SAVE</button>} */}

                    </div>


                    <div className="personalformd">

                        <form>
                            <div >
                                <label className="personal-labeld" for="name">Full Name:</label>
                                {!this.state.isEdit ?
                                    <input className="personal-inputd" type="text" id="name" name="name" value={this.state.FullName} autoComplete="off" />
                                    : <input className="personal-inputd" type="text" id="name" name="name" onChange={this.onChangeHandler} />}
                            </div>
                            {/* <div >
                                <label className="personal-labeld" for="email">Email</label>
                                {/* <input className="personal-inputd" type="email" id="email" name="email"/> */}
                            {/* {!this.state.isEdit ?
                                    <input className="personal-inputd" type="email" id="email" name="email" value={this.state.EmailId} />
                                    : <input className="personal-inputd" type="email" id="email" name="email" onChange={this.onChangeHandler} />}
                            </div> */}
                            {/* <div >
                                <label className="personal-labeld" for="password">Password</label>
                                <input className="personal-inputd" type="password" id="password" name="password" />
                            </div> */}
                            <div >
                                <label className="personal-labeld" for="number">Mobile Number</label>
                                {/* <input className="personal-inputd" type="tel" id="number" name="number" /> */}
                                {!this.state.isEdit ?
                                    <input className="personal-inputd" type="tel" id="number" name="number" value={this.state.phoneNo} />
                                    : <input className="personal-inputd" type="tel" id="number" name="number" onChange={this.onChangeHandler} />}
                            </div>
                        </form>
                    </div>


                    <div className="heading2d">
                        <h2> Address Details</h2>
                        {/* <button className="add-address-buttond">Add New Address</button> */}
                    </div>

                    <div className="addressformd">

                        <h2 className="heading-workd"> 1.WORK </h2>
                            {/* div className="edit-button2d" onClick={!this.state.isUpdate ? this.edit2 : this.Cancel2}>
                            {!this.state.isUpdate ? 'Edit' : 'Cancel'}</div>
                            {!this.state.isUpdate ? '' : <button className="save-button2d">SAVE</button>}</h2> */}



                        <form>
                            
                            <div>
                                <label className="address-textd">Address</label>
                                {!this.state.isUpdate ?
                                    <input className="address-inputd" type="text" id="address" value={this.state.addressArray.fullName} />
                                    : <input className="address-inputd" type="text" id="address" onChange={this.onChangeHandler} />}

                                <label className="city-fieldd" >
                                    <span className="spand">City/Town</span><br></br>
                                    {!this.state.isUpdate ?
                                        <input className="city-inputd" type="text" id="city" value={this.state.addressArray.city} />
                                        : <input className="city-inputd" type="text" id="city" onChange={this.onChangeHandler} />}
                                </label>
                                <label >
                                    <span className="state-fieldd">State</span><br></br>
                                    {!this.state.isUpdate ?
                                        <input className="state-inputd" type="text" id="state" value={this.state.addressArray.state} />
                                        : <input className="state-inputd" type="text" id="state" onChange={this.onChangeHandler} />}
                                </label>
                            </div>

                            <p className="type-textd">Type</p>

                            <div className="radio-typed">



                                <input type="radio" className="homeRadio" name="type" value="home" />

                                <label className="radio" for="home">Home</label>
                                <input type="radio" className="workRadio" name="type" value="work" checked/>
                                <label className="radio" for="work" defaultChecked>Work</label>
                                <input type="radio" className="otherRadio" name="type" value="other" />
                                <label className="radio" for="other">Other</label>
                            </div>

                        </form>

                  </div>


                </div>

            </>
        );
    }
}