import config from '../config/config'
import AxiosService from './axios-service';
const Url = config.baseUrl+"/bookdata";

export default class BookStoreService {

    getBooksFromDatabase(pageNo) {
        return AxiosService.getService(`${Url}/books/${pageNo}`);
    }

    getBooksCount() {
        return AxiosService.getService(`${Url}/getbookcount`);
    }

    getBooksByNewArrival(pageNo){
        return AxiosService.getService(`${Url}//books/NewArraival/${pageNo}`)
    }

    getBooksByLowToHighPrice(pageNo){
        return AxiosService.getService(`${Url}/books/LowToHigh/${pageNo}`)
    }

    getBooksByHighToLowPrice(pageNo){
        return AxiosService.getService(`${Url}/books/HighToLow/${pageNo}`)
    }

    serachByBookName(bookName){
        console.log("BookNAme", bookName);
        return AxiosService.getService(`${Url}/find/${bookName}`)
    }

    getBookById(bookId){
        return AxiosService.getService(`${Url}/${bookId}`)
    }

    updateBookQuantity(token,bookid,quantity) {
        return AxiosService.putService(`${Url}/updatequantity/${bookid}/${quantity}`,{}, true, {
          headers: {
            tokenId: token
          }
        })
      
    }

}