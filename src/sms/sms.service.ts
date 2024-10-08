import {Injectable} from '@nestjs/common';
const FormData = require('form-data');
import  axios from 'axios';
import { SMS_TOKEN } from '../app.constants';

@Injectable()
export class SmsService {
  async sendSms(phone_number: string, otp: string) {
    const data = new FormData();
    data.append("mobile_phone", phone_number);
    data.append("message", "Bu Eskiz dan test");
    data.append("from", "4546");

    var config = {
      method: "post",
      maxBodyLength: Infinity,
      url: process.env.SMS_SERVICE_URL,
      headers: {
        Authorization: `Bearer ${process.env.SMS_TOKEN}`,
      },
      data: data,
    };

    try {
      const response = await axios(config);
      return response;
      // axios(config)
      //   .then(function (response) {
      //     console.log(JSON.stringify(response.data));
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });
    } catch (error) {
      console.log(error);
      return { status: 500 };
    }
  }
  async refreshToken() {

    var config = {
      method: "patch",
      maxBodyLength: Infinity,
      url: "https://notify.eskiz.uz/api/auth/refresh",
      headers: {
        Authorization: `Bearer ${SMS_TOKEN}`,
      },
    };

    try {
     const response = await axios(config);
     return response.data;
    } catch (error) {
      console.log(error)
      return { status: 500 };
    }

    

  }

  
  async getToken() {}
}