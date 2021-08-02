const axios = require('axios').default;

class AxiosService {
    postService(url = '', payload=null, tokenRequired=false, httOptions = null){
        
       return axios.post(url, payload, tokenRequired && httOptions);
    }

    getService(url = '', tokenRequired=false, httOptions = null){

        return axios.get(url, tokenRequired && httOptions);
     }
     deleteService(url = '', tokenRequired=false, httOptions = null){
 
         return axios.delete(url, tokenRequired && httOptions);
      }

     putService(url = '',data, tokenRequired=false, httOptions = null){
 
         return axios.put(url, data, tokenRequired && httOptions );
      }

    updateService(url = '', tokenRequired=false, httOptions = null){
 
         return axios.put(url, tokenRequired && httOptions);
      }
      

}
module.exports = new AxiosService();