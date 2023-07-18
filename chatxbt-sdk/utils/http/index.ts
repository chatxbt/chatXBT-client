import { axiosInstance } from './axios-instance'
import { credentials, envConfig, lang } from "../../config";
import { isAuthed, getAuthToken, customlocalStorage } from "../toolkit";
import Issue from "../error-handler"
import axios, { Axios, AxiosInstance } from "axios"

//set up api connect
export const privateApiConnect = (carrier: 'axios' | 'jquery' | 'super-agent' = 'axios' ): AxiosInstance => {
    try {
       // headers
      let headers: any = {
         // "x-token": signXToken,
         // "secret-token": encryptAES,
         // gRecaptcha: captcha
      };
         
      // check to see if can add dynamic authorization
      if (isAuthed()) {
         headers.Authorization = `Bearer ${getAuthToken()}`;
      }

      switch (carrier) {
         case 'axios':
            return axiosInstance({
               baseURL: envConfig.aiChatBotUrl,
               headers
            })
            break;
         
         default:
            throw new Issue(500, lang.cantDetectCarrier);
               
            break;
      }
    } catch (error: any) {
      throw new Issue(500, error.message);
    }
 };

 //set up api connect
export const publicApiConnect = (carrier: 'axios' | 'jquery' | 'super-agent' = 'axios' ): Axios => {
   try {
      switch (carrier) {
         case 'axios':
            return axios
            break;
        
         default:
            throw new Issue(500, lang.cantDetectCarrier);
              
            break;
        }
   } catch (error: any) {
     throw new Issue(500, error.message);
   }
};

