import config from '../config/config'
import AxiosService from './axios-service';
const Url = config.baseUrl+"/orderPlaced";

export default class OrderBookAxiosService {
    orderBook(token) {
        return AxiosService.postService(`${Url}/order`, {}, true, {
          headers: {
            tokenId: token
          }
        })
      }

      getOrderId(token) {
      return AxiosService.getService(`${Url}/getOrderId`, true, {
        headers: {
          tokenId: token
        }
      })
    }
}