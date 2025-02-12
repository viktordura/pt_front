import axios from "axios";
import env from "../env";

export const useFetch = () => {
    
    const instance = axios.create({
        baseURL: env.urlBackend,
        headers: {
        }
    })


    const post = async (url, body = {},params="") => {
        params = new URLSearchParams(params).toString();
        url = (params !== "") ? url+"?"+params : url;
        return new Promise((resolve,reject)=>{
            instance.post(url,body)
            .then( response =>{
                if (response.data.success) {
                    resolve(response.data);
                }else{
                    resolve(response.data);
                }
            }).catch(error=>{
                reject(error.response.data);
            })
        });
    }

    const get = async (url, params) => {
        params = new URLSearchParams(params).toString();
        url = (params !== "") ? url+"?"+params : url;
        return new Promise((resolve,reject)=>{
            instance.get(url)
            .then( response =>{
                if (response.data.success) {
                    resolve(response.data);
                }else{
                    resolve(response.data);
                }
            }).catch(error=>{
                reject(error.response.data);
            })
        });
    }
    


    return { post, get };
}