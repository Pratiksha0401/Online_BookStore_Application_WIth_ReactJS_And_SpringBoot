import React, { Component } from 'react'
import './UserAuth.scss';
import { Link } from 'react-router-dom';
import image from '../../assests/component.png'
import UserService from '../../components/services/user-service';
import { Snackbar } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
//import ClearIcon from '@material-ui/icons/Clear';
import { Redirect } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

export default class UserAuth extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLogin: true,
            isSignup: false
        }
    }

    openLogin() {
        this.setState({ isLogin: true, isSignup: false })
    }

    openSignup() {
        this.setState({ isLogin: false, isSignup: true })
    }

    render() {
        return (
            <>
                <div className="main-container">
                    <div className="container-1">
                        <img className="image" src={image}></img>
                        <p className="online">ONLINE BOOK SHOPPING</p>
                    </div>
                    <div className="container2">
                        <div className={"controller1 " + (this.state.isLogin ? "selected-controller" : "")}>
                            <h1 className="page-view" onClick={() => this.openLogin()}>LOGIN</h1>
                            {this.state.isLogin && <Login />}
                        </div>
                        <div className={"controller2 " + (this.state.isSignup ? "selected-controller" : "")}>
                            <h1 className="page-view" onClick={() => this.openSignup()}>SIGNUP</h1>
                            {this.state.isSignup && <Signup />}
                        </div>
                    </div>

                </div>
            </>
        )
    }
}




const initialLoginValues = {
    email: '',
    password: '',
    type: '',
    error: {
        email: '',
        password: '',
    },
    valid: {
        email: '',
        password: '',
    },

}

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            type: 'password',
            

            error: {
                email: '',
                password: '',
            },
            valid: {
                email: '',
                password: '',
            },
            isLoader :false,
            snackbarOpen: false,
            snackbarmsg: '',
            redirect:null
        }

        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    }

    emailChangeHandler = (event) => {
        this.setState({ email: event.target.value });
        this.checkEmail(event.target.value);
    }
    passwordChangeHandler = (event) => {
        this.setState({ password: event.target.value });
        this.checkPassword(event.target.value);
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

    checkEmail = (emailValue) => {
        if (emailValue.length === 0) {
            this.initializeMessage('email', '', '');
        } else {
            const EMAIL_REGEX = RegExp("^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$");
            if (EMAIL_REGEX.test(emailValue)) {
                this.initializeMessage('email', '');
            } else {
                this.initializeMessage('email', 'Enter Valid Email', '');
            }
        }
    }

    checkPassword = (passwordValue) => {
        if (passwordValue.length === 0) {
            this.initializeMessage('password', '', '');
        } else {
            const PASSWORD_REGEX = RegExp("^(?=.[a-z])(?=.[A-Z])(?=.[0-9])(?=.[@$!%?&])[A-Za-z0-9@$!%?&]{8,}$");
            // if(PASSWORD_REGEX.test(passwordValue)) {
            //     this.initializeMessage('password','');
            // } else {
            //     this.initializeMessage('password', 'Enter Valid Password', '');
            // }
        }
    }

    checkGlobalError = () => {
        if (this.state.error.email.length === 0 && this.state.error.password.length === 0) {
            this.setState({ isError: false });
        } else {
            this.setState({ isError: true });
        }
    }

    handleClick = () => this.setState(({ type }) => ({
        type: type === 'text' ? 'password' : 'text'
    }))

    login = async(event) => {
        this.setState({
            isLoader:true})
        event.preventDefault();
        event.stopPropagation();
        let userData = {
            emailId: this.state.email,
            password: this.state.password
        }
       await new UserService().loginUser(userData)
            .then(response => {
                let responseData = response.data;
                localStorage.setItem("token", responseData.message)
                localStorage.setItem("userData",responseData.data.fullName)
                this.reset();
                this.setState({
                    isLoader:false,
                    snackbarOpen: true,
                    snackbarmsg: 'LOGIN SUCCESSFULL',
                    redirect:"/"
                })
            }).catch(error => {
                this.setState({
                    
                    snackbarOpen: true,
                    isLoader:false,
                    snackbarmsg: error.response.data.message,
                   
                    
                })
                this.reset();

            })
    }

    

    reset = () => {
        this.setState({ ...initialLoginValues })
    }

    snackbarClose = (event) => {
        this.setState({ 
            snackbarOpen: false })
    }

    render() {
        if(this.state.redirect){
            return <Redirect to=""/>
        }
        return (
            <div>
                <div className="box1">
                    <div className="rectangle">
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
                    <form className="form">
                        <label className="label1" htmlFor="email">Email Id</label>
                        <input type="email" name="email" className="input-field email" value={this.state.email} onChange={this.emailChangeHandler} autoComplete="off" required />
                        <div>
                            <valid-message className="valid-email" htmlFor="email">{this.state.valid.email}</valid-message>
                            <error-output className="email-error" htmlFor="email">{this.state.error.email}</error-output>
                        </div>

                        <label className="label2" htmlFor="password">Password</label>
                        <input type={this.state.type} name="password" className="input-field password" value={this.state.password} onChange={this.passwordChangeHandler} required />
                        {/* <span toggle="#password-field" class="fa fa-fw fa-eye field-icon toggle-password" onClick={this.handleClick}>{this.state.type === 'text' ? '' : ''}</span>  */}
                        <span toggle="#password-field" class="fa fa-fw fa-eye field-icon toggle-password" onClick={this.handleClick}>{this.state.type === 'text' ? '' : ''}</span>
                        <valid-message className="valid-password" htmlFor="password">{this.state.valid.password}</valid-message>
                        <error-output className="password-error" htmlFor="password">{this.state.error.password}</error-output>

                        <div className="link2">
                            <Link className="link1" to="/Forgot">Forgot Password?</Link>
                        </div>

                        <button className="button1" type="submit" onClick={this.login.bind(this)}>
                             {/* <Link to="">Login</Link>Login</button>  */}Login</button>
                             <div className = "Loader">
                            {this.state.isLoader ?<CircularProgress/> :<Snackbar/>}
                            </div>
                    </form>
                </div>
            </div>
        )
    }
}

const initalValue = {
    id: '',
    fullname: '',
    email: '',
    password: '',
    mobilenumber: '',


    error: {
        fullname: '',
        email: '',
        password: '',
        mobilenumber: ''
    },
    valid: {
        fullname: '',
        email: '',
        password: '',
        mobilenumber: ''
    }
}

class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            fullname: '',
            email: '',
            password: '',
            mobilenumber: '',


            error: {
                fullname: '',
                email: '',
                password: '',
                mobilenumber: ''
            },
            valid: {
                fullname: '',
                email: '',
                password: '',
                mobilenumber: ''
            },
            isLoader:false,
            snackbarOpen: false,
            snackbarmsg: ''
        }

        this.fullnameChangeHandler = this.fullnameChangeHandler.bind(this);
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.mobilenumberChangeHandler = this.mobilenumberChangeHandler.bind(this);
    }

    fullnameChangeHandler = (event) => {
        this.setState({ fullname: event.target.value });
        this.checkFullname(event.target.value);
    }

    emailChangeHandler = (event) => {
        this.setState({ email: event.target.value });
        this.checkEmail(event.target.value);
    }
    passwordChangeHandler = (event) => {
        this.setState({ password: event.target.value });
        this.checkPassword(event.target.value);
    }

    mobilenumberChangeHandler = (event) => {
        this.setState({ mobilenumber: event.target.value });
        this.checkMobilenumber(event.target.value);
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

    checkFullname = (fullnameValue) => {
        if (fullnameValue.length === 0) {
            this.initializeMessage('fullname', '', '');
        } else {
            const FULLNAME_REGEX = RegExp("^[A-Z]{1}[a-z A-Z\\s]{2,}$");
            if (FULLNAME_REGEX.test(fullnameValue)) {
                this.initializeMessage('fullname', '');
            } else {
                this.initializeMessage('fullname', 'Enter Valid Name', '');
            }
        }
    }

    checkEmail = (emailValue) => {
        if (emailValue.length === 0) {
            this.initializeMessage('email', '', '');
        } else {
            const EMAIL_REGEX = RegExp("^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$");
            if (EMAIL_REGEX.test(emailValue)) {
                this.initializeMessage('email', '');
            } else {
                this.initializeMessage('email', 'Enter Valid Email', '');
            }
        }
    }

    checkPassword = (passwordValue) => {
        if (passwordValue.length === 0) {
            this.initializeMessage('password', '', '');
        } else {
            const PASSWORD_REGEX = RegExp("^(?=.[a-z])(?=.[A-Z])(?=.[0-9])(?=.[@$!%?&])[A-Za-z0-9@$!%?&]{8,}$");
            // if(PASSWORD_REGEX.test(passwordValue)) {
            //     this.initializeMessage('password','');
            // } else {
            //     this.initializeMessage('password', 'Enter Valid Password', '');
            // }
        }
    }

    checkMobilenumber = (mobilenumberValue) => {
        if (mobilenumberValue.length === 0) {
            this.initializeMessage('mobilenumber', '', '');
        } else {
            const MOBILE_REGEX = RegExp("((^\\+?)(([0-9]{2, 3})(\\s))?)[1-9]{1}[0-9]{9}$");
            if (MOBILE_REGEX.test(mobilenumberValue)) {
                this.initializeMessage('mobilenumber', '');
            } else {
                this.initializeMessage('mobilenumber', 'Enter Valid Mobile Number', '');
            }
        }
    }

    checkGlobalError = () => {
        if (this.state.error.fullname.length === 0 && this.state.error.email.length === 0
            && this.state.error.password.length === 0 && this.state.error.mobilenumber.length === 0) {
            this.setState({ isError: false });
        } else {
            this.setState({ isError: true });
        }
    }



    signup = async (event) => {
        this.setState({
            isLoader:true})
        event.preventDefault();
        event.stopPropagation();
        let userData = {
            fullName: this.state.fullname,
            emailId: this.state.email,
            password: this.state.password,
            phoneNumber: this.state.mobilenumber
        }

       await new UserService().addingUser(userData)
            .then(response => {
                this.reset();
                this.setState({
                    isLoader:false,
                    snackbarOpen: true,
                    snackbarmsg: 'SIGNUP SUCCESSFULL'
                })

            }).catch(error => {
                this.setState({
                    isLoader:false,
                    snackbarOpen: true,
                    snackbarmsg: error.response.data.message
                })
            })
    }

    reset = () => {
        this.setState({ ...initalValue });
    }

    snackbarClose = (event) => {
        this.setState({ snackbarOpen: false })
    }
    render() {
        return (
            <div>
                <div className="box2">
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
                    <div className="rectangle2">
                    </div>
                    <form>

                        <div className="label10">
                            <label className="label3" htmlFor="fullname">Full Name</label>
                        </div>
                        <input type="text" name="fullname" className="input-field text" value={this.state.fullname} onChange={this.fullnameChangeHandler} />
                        <div className="fullname-error1">
                            <valid-message className="valid-fullname" htmlFor="fullname">{this.state.valid.fullname}</valid-message>
                            <error-output className="fullname-error" htmlFor="fullname">{this.state.error.fullname}</error-output>
                        </div>

                        <div className="label9">
                            <label className="label4" htmlFor="email">Email Id</label>
                        </div>
                        <input type="email" name="email" className="input-field text1" value={this.state.email} onChange={this.emailChangeHandler} />
                        <div className="email-error2">
                            <valid-message className="valid-email2" htmlFor="email">{this.state.valid.email}</valid-message>
                            <error-output className="email-error2" htmlFor="email">{this.state.error.email}</error-output>
                        </div>
                        <div className="label8">
                            <label className="label5" htmlFor="password">Password</label>
                        </div>
                        <input type="password" name="password" className="input-field text2" value={this.state.password} onChange={this.passwordChangeHandler} />
                        {/* <span toggle="#password-field" class="fa fa-fw fa-eye field-icon1 toggle-password" onClick={this.handleClick}>{this.state.type === 'text' ? '' : ''}</span> */}
                        <div className="password-error2">
                            <valid-message className="valid-password2" htmlFor="password">{this.state.valid.password}</valid-message>
                            <error-output className="password-error2" htmlFor="password">{this.state.error.password}</error-output>
                        </div>

                        <div className="label7">
                            <label className="label6" htmlFor="mobilenumber">Mobile Number</label>
                        </div>
                        <input type="text" name="mobilenumber" className="input-field text3" value={this.state.mobilenumber} onChange={this.mobilenumberChangeHandler} />
                        <div className="moblienumber-error">
                            <valid-message className="valid-moblienumber" htmlFor="moblienumber">{this.state.valid.mobilenumber}</valid-message>
                            <error-output className="moblienumber-error" htmlFor="moblienumber">{this.state.error.mobilenumber}</error-output>
                        </div>

                        <button className="button2" type="submit" onClick={this.signup.bind(this)}>Signup</button>
                        <div className="Loader1">
                        {this.state.isLoader?<CircularProgress/>:<Snackbar/>}
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}