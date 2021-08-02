import config from '../config/config'
import axiosService from './axios-service';
import AxiosService from './axios-service';
const Url = config.baseUrl;

export default class UserService {
   
    addingUser(data) {
        return AxiosService.postService(`${Url}/user/create`, data);
    }

    loginUser(userData) {
        return AxiosService.postService(`${Url}/user/login` , userData);
    }

    forgotPassword(email){
        return AxiosService.postService(`${Url}/user/reset/link/${email}`);
    }

    resetPassword(object,token){
        return AxiosService.putService(`${Url}/user/reset/password`,object,true,{
            headers: {
              tokenId: token
            }})
    }

    verify(token){
        return AxiosService.getService(`${Url}/user/verify/email/${token}`);
    }

    updateUser(object,tokenId){
        return AxiosService.putService(`${Url}/user/updateUserData`,object,true,{
            headers: {
              token: tokenId
            }})
    }

    getUesrData(tokenId){
        return AxiosService.getService(`${Url}/user/getUserDataById`,true,{
            headers: {
              token: tokenId
            }})
    }

    getAddressData(tokenId){
        return AxiosService.getService(`${Url}/getAddress`,true,{
            headers: {
              token: tokenId
            }})
    }

    addAddress(tokenId,object){
        return axiosService.postService(`${Url}/addAddress`,object,true,{
            headers: {
              token: tokenId
            }})
    }
    
}