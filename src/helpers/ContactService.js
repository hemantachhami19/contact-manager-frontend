// import React from 'react';
import axios from 'axios'
import config  from "./config";
const baseUrl = config.baseUrl;

class ContactService {

  static postApi(url, data) {
    return axios.post(baseUrl + url, data);
  }

  static putApi(url, data) {
    console.log(url,data);
    return axios.put(baseUrl + url, data);
  }

  static getApi(url) {
    return axios.get(baseUrl + url);
  }

  static deleteApi(url) {
    return axios.delete(baseUrl + url);
  }

}

export default ContactService
