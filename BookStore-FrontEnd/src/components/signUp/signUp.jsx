import React from 'react';
import { Modal } from 'react-bootstrap'
import './signUp.scss';
import supermarket from '../../assests/2766594.png'
import login from '../login/login'
import UserService from '../services/user-service';
import { useHistory, useParams, Link, withRouter } from 'react-router-dom';
import TextField from "@material-ui/core/TextField";
const initalValue = {
    snackbaropen: false,
    snackbarmsg: '',
    severity: "",
    email: '',
    status1: false,
    helpertext1: ' ',
    password: '',
    status2: false,
    helpertext2: ' ',
    fullName: '',
    status3: false,
    helpertext3: ' ',
    phoneNumber: '',
    status4: false,
    helpertext4: ' ',
    loginChecked: true,
    signupChecked: false,
    loginFormFlag: true,
    error: {
        email: '',
        password: '',
        fullName: '',
        phoneNumber: '',
    },
    valid: {
        email: '',
        password: '',
        fullName: '',
        phoneNumber: '',
    }

}
class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            snackbaropen: false,
            snackbarmsg: '',
            severity: "",
            email: '',
            status1: false,
            helpertext1: ' ',
            password: '',
            status2: false,
            helpertext2: ' ',
            fullName: '',
            status3: false,
            helpertext3: ' ',
            phoneNumber: '',
            status4: false,
            helpertext4: ' ',
            loginChecked: true,
            signupChecked: false,
            loginFormFlag: true,
            type: 'password',
            error: {
                email: '',
                password: '',
                fullName: '',
                phoneNumber: '',
            },
            valid: {
                email: '',
                password: '',
                fullName: '',
                phoneNumber: '',
            }
        }
    }
    onChangeHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        this.checkValidation(event.target.name, event.target.value)
    }
    checkValidation = (field, value) => {
        if (field === 'email') {
            if (value.length === 0) {
                this.initializeMessage('email', '', '');
                return this.state.isVerified;

            }
            else {
                const EMAIL_REGEX = RegExp("^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})");
                if (EMAIL_REGEX.test(value)) {
                    this.initializeMessage('email', '', '');
                    return this.state.isVerified;
                } else {
                    this.initializeMessage('email', 'Email is Invalid!', '');
                    console.log("Email is incorrect")
                    return this.state.isError;
                }
            }
        }
        else if (field === 'password') {

            if (value.length === 0) {
                this.initializeMessage('password', '', '');
                return this.state.isVerified;

            }
            else {
                const password_REGEX = RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{8,}$");
                if (password_REGEX.test(value)) {
                    this.initializeMessage('password', '', '');
                    return this.state.isVerified;
                } else {
                    this.initializeMessage('password', 'Password is Invalid!', '');
                    console.log("Password is Incorrect")
                    return this.state.isError;
                }
            }
        }
        else if (field === 'phoneNumber') {

            if (value.length === 0) {
                this.initializeMessage('phoneNumber', '', '');
                return this.state.isVerified;

            }
            else {
                const phoneNumber_REGEX = RegExp("^([1-9]{1}[0-9]{9})$");
                if (phoneNumber_REGEX.test(value)) {
                    this.initializeMessage('phoneNumber', '', '');
                    return this.state.isVerified;
                } else {
                    this.initializeMessage('phoneNumber', 'phoneNumber is Invalid!', '');
                    console.log("phoneNumber is Incorrect")
                    return this.state.isError;
                }
            }
        }

        else if (field === 'fullName') {

            if (value.length === 0) {
                this.initializeMessage('fullName', '', '');
                return this.state.isVerified;

            }
            else {
                const fullName_REGEX = RegExp("^[A-Z]{1}[a-z A-Z\\s]{2,}$");
                if (fullName_REGEX.test(value)) {
                    this.initializeMessage('fullName', '', '');
                    return this.state.isVerified;
                } else {
                    this.initializeMessage('fullName', 'fullName is Invalid!', '');
                    console.log("fullName is Incorrect")
                    return this.state.isError;
                }
            }
        }


    }

    initializeMessage = (field, errorMessage, validMessage) => {
        this.setState(previousState => ({
            error: {
                ...previousState.error,
                [field]: errorMessage
            }
        }));
        this.setState(previousState => ({
            valid: {
                ...previousState.valid,
                [field]: validMessage
            }
        }));

    }
    signup = (event) => {
        event.preventDefault();
        event.stopPropagation();
        let user = {
            fullName: this.state.fullName,
            emailId: this.state.email,
            password: this.state.password,
            phoneNumber: this.state.phoneNumber,
        }

        new UserService().addingUser(user).then(response => {

            alert("successfully resistered!!!");

        }).catch(err => {
            console.log("error while adding try once...")

        })
    }
    reset = () => {
        this.setState({ ...initalValue });
    }
    handleClick = () => this.setState(({ type }) => ({
        type: type === 'text' ? 'password' : 'text'
    }))

    render() {
        return (
            <div className="row">
                <div className="column background">
                    <img src={supermarket} className="image" />
                    <h3 className="logotext">ONLINE BOOK SHOPPING</h3>
                </div>

                <div className="column formContent">

                    <h2 className="signupFormHeader">SIGNUP</h2>
                    <form className="form" onSubmit={this.signup}>
                        <div className="form-group">
                            <label className="label" htmlFor="fullName">Full Name</label>
                            <input type="text" className="form-control" name="fullName" id="fullName" onChange={this.onChangeHandler} required />
                            <valid-message className="valid-name" htmlFor="fullName">{this.state.valid.fullName}</valid-message>
                            <error-output className="name-error" htmlFor="fullName">{this.state.error.fullName}</error-output>
                        </div>
                        <div className="form-group">
                            <label className="label" htmlFor="email" >Email ID</label>
                            <input type="email" className="form-control" id="email" name="email" onChange={this.onChangeHandler} required />
                            <valid-message className="valid-name" htmlFor="email">{this.state.valid.email}</valid-message>
                            <error-output className="name-error" htmlFor="email">{this.state.error.email}</error-output>
                        </div>
                        <div className="form-group">
                            <label className="label" htmlFor="password" >Password</label>
                            <input type={this.state.type} className="form-control" id="password" name="password" onChange={this.onChangeHandler} required />
                            <span toggle="#password-field" class="fa fa-fw fa-eye field-icon toggle-password" onClick={this.handleClick}>{this.state.type === 'text' ? '' : ''}</span>
                            <valid-message className="valid-name" htmlFor="password">{this.state.valid.password}</valid-message>
                            <error-output2 className="name-error" htmlFor="password">{this.state.error.password}</error-output2>
                        </div>
                        <div className="form-group">
                            <label className="label" htmlFor="phoneNumber" >Mobile Number</label>
                            <input type="text" className="form-control" name="phoneNumber" onChange={this.onChangeHandler} required />
                            <valid-message className="valid-name" htmlFor="phoneNumber">{this.state.valid.phoneNumber}</valid-message>
                            <error-output2 className="name-error" htmlFor="phoneNumber">{this.state.error.phoneNumber}</error-output2>
                        </div>
                        <div className="para">
                            <Link to="/login" className="link">Login if user already exist!!</Link>
                        </div>
                        <button type="submit" className="btn">SignUp</button>
                    </form>
                </div>
            </div>
        )
    }




}
export default SignUp;
