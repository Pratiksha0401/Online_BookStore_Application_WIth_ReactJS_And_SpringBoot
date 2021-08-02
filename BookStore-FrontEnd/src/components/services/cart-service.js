import config from '../config/config'
import AxiosService from './axios-service';
const Url = config.baseUrl + "/cart";

export default class CartService {

  addBookToCart(bookId, tokenId) {
    return AxiosService.postService(`${Url}/addBookToCart/${bookId}`, {quantity:1,status:"In cart"}, true, {
      headers: {
        token: tokenId
      }
    })
  }

  getCartList(tokenId) {
    return AxiosService.getService(`${Url}/getcartdeatails`, true, {
      headers: {
        token: tokenId
      }
    })
  }

  deleteCart(cartId,tokenId){
    return AxiosService.deleteService(`${Url}/deleteCart/${cartId}`,true,{
        headers: {
          token: tokenId
        }})
}

updateCartQuantity(cartId,tokenId,quantity){
  return AxiosService.putService(`${Url}/updateCart/${cartId}/${quantity}`,{},true,{
      headers: {
        token: tokenId
      }})
}

updateCartStatus(cartId,token,status){
  return AxiosService.putService(`${Url}/updateStatus/${cartId}/${status}`,{},true,{
      headers: {
        tokenId: token
      }})
}

}