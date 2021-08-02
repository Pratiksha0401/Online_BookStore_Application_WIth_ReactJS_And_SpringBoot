import React from 'react'
 import './reset.scss'
 import logo from '../../assests/education.svg'
import UserService from '../services/user-service'
import { withRouter } from 'react-router-dom';

class Reset extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            tokenId: '',
            password: '',
            error: {
                
                password: ''
            },
            valid: {
                
                password: ''
            }
        }
    }

    componentDidMount =() =>{

        this.setState({tokenId:this.props.match.params.token})
        
    }
    
    onChangeHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        //this.checkValidation(event.target.name, event.target.value)
    }

    // checkValidation = (value) => {
    //     if (value.length === 0) {
    //         this.initializeMessage('password', '');
    //         return this.state.isVerified;

    //     }
    //     else {
    //         const password_REGEX = RegExp("^(?=.[a-z])(?=.[A-Z])(?=.[0-9])(?=.[@$!%?&])[A-Za-z0-9@$!%?&]{8,}$");
    //         // if (password_REGEX.test(value)) {
    //         //     this.initializeMessage('password', '');
    //              return this.state.isVerified;
    //         // } else {
    //         //     this.initializeMessage('password', 'Password is Invalid!');
    //         //     console.log("Password is Incorrect")
    //         //     return this.state.isError;
    //         //}
    //     }
    // }

    // initializeMessage = (field, errorMessage, validMessage) => {
    //             this.setState(previousState => ({
    //                 error: {
    //                     ...previousState.error,
    //                     [field]: errorMessage
    //                 }
    //             }));
    //             this.setState(previousState => ({
    //                 valid: {
    //                     ...previousState.valid,
    //                     [field]: validMessage
    //                 }
    //             }));
    //         }
            
            resetPassword = (event) => {
                var formData = new FormData();
                formData.append('password', this.state.password);
                // let object={

                // }
                console.log(formData);
                event.preventDefault();
                event.stopPropagation();
                // let object= {
                //     password: this.state.password,  
                    
                // }
                
                //console.log(formData);
                new UserService().resetPassword(formData,this.state.tokenId).then(response=>{
                    alert("Password Updated Succesfully")
                    localStorage.removeItem('resetToken')
                    this.props.history.push("/Login")
                } ).catch(err =>{
                    alert("Error while resetting password")
                })
            }


            render() {
               return (
                   <>
                <div className="header1">
                <img className="img1" src={logo} alt="" />
                <header className="head">BookStore</header>

                </div>

                  <div className="form-contentR">
                        <form className="formR" onSubmit={this.resetPassword} >
                            <div className = "para">
                                <h4 className="paratop">SET NEW PASSWORD</h4>
                            </div>
                         {/* <div className="form-groupR">
                             <label className="labelR" htmlFor="otp" >ConfirmPassword</label>
                             <input type="number" className="form-controlR" id="otp" name="otp" autoComplete="off" onChange = {this.onChangeHandler} required />
                         </div> */}
                         <div className="form-groupR">
                             <label className="labelR" htmlFor="password" >Password</label>
                             <input type="password" className="form-controlR" id="password" name="password" value={this.state.password} onChange = {this.onChangeHandler} autoComplete="off"  required />
                             <span toggle="#password-field" class="fa fa-fw fa-eye  toggle-passwordR" ></span> 
                             {/* <valid-message className="valid" htmlFor="password">{this.state.valid.password}</valid-message>
                             <error-output2 className="name" htmlFor="password">{this.state.error.password}</error-output2>*/}
                        </div> 
                        <button className="buttonSet" type="submit">SET</button>
                        {/* <div className="buttonbox">
                            <button className="button" type="submit">SET</button>
                        </div> */}
                     </form>
                  </div>
                  </>
               )
            }               
}

export default withRouter(Reset);