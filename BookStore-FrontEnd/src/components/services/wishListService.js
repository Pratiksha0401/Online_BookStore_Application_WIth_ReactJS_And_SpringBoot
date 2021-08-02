import config from '../config/config'
import AxiosService from './axios-service';
const Url = config.baseUrl;

export default class WishListService {

    addBookToWishList(bookId,tokenId){
        return AxiosService.postService(`${Url}/addBookToWishList/${bookId}`, {},true,{
            headers: {
              token: tokenId
            }})
    }

    getWishList(tokenId){
        return AxiosService.getService(`${Url}/getWishList`,true,{
            headers: {
              token: tokenId
            }})
    }

    deleteWishList(wishListId,tokenId){
      return AxiosService.deleteService(`${Url}/deleteWishList/${wishListId}`,true,{
          headers: {
            token: tokenId
          }})
  }

}