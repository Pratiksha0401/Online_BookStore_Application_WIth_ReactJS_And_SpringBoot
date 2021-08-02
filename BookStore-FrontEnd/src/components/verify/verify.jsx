import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import UserService from '../services/user-service';
import './verify.scss'

class Verify extends Component {
    constructor(props) {
        super(props)
        this.state={
            tokenId:''
        }
        console.log(props);
        
    }

    componentDidMount =() =>{
        this.setState({tokenId:this.props.match.params.token})
    }

    verify = async(event) => {
        event.preventDefault();
        event.stopPropagation();
        let tokenId = this.state.tokenId;
         await new UserService().verify(tokenId)
            .then(response => {
                this.props.history.push("/login")
            }).catch(error => {
            })
        //console.log("Hello")
    }
    render(){
        return(
            <>  
                <div className="verify-main">
                <form className="verify-form" >
                    <p className="verifydata">Please Click To Verify ...</p>
                    <button className="verify-button"  onClick={this.verify.bind(this)}>Verify</button>
                </form>
                </div>
            </>
        )
    }
}
export default withRouter (Verify);