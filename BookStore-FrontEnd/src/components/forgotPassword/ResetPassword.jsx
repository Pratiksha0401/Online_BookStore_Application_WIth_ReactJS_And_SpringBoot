import React, { useState, useEffect } from 'react'
import './ResetPassword.css';
import logo from '../../assests/book.png';
import { Link } from 'react-router-dom';
import reactDom from 'react-dom';
import UserService from '../services/user-service';
import { render } from '@testing-library/react';


class ResetPassword extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            isUpdate: false,
            error: {
                email: ''
            }
        }
        this.onChangeHandler = this.onChangeHandler.bind();
    }
    onChangeHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    
    }
    forgot = (event) =>{
        event.preventDefault();
        event.stopPropagation();
        let emailId = this.state.email
        console.log(emailId)

        new UserService().forgotPassword(emailId).then((Response)=>{
            localStorage.setItem("resetToken",Response.data.data)
            alert("Link send to your mail id successfully")
            this.props.history.push("/reset")
        }).catch((error)=>{
            alert("Enter valid email")
        })
    }
    render() {
        return (

            <div className="body1">

               
                <div className="header1">
                    <img className="img1" src={logo} alt="" />
                    <header className="head">BookStore</header>

                </div>

                <div className="header-content1">
                    <div className="content-text1">
                        <b>Forgot Your Password?</b><br />


                    </div>

                    <div className="content-box1">
                        <p className="p1">Enter your email address and we'll send you a link to reset your password</p>


                        <form  onSubmit = {this.forgot}>
                            <label htmlFor="email" className="email-text1">Email Id</label>
                            <input type = "email" className = "input1" name = "email" onChange = {this.onChangeHandler}/>
                            
                            <button className="reset-button1" type="submit" value="Submit">Reset Password</button>
                            

                        </form>

                    </div>
                    <div className="create1">
                        <h className="heading"><b>
                            <Link to="" className="link3">CREATE ACCOUNT</Link></b></h>
                    </div>
                </div>
            </div>
        )
    }

}


export default ResetPassword;