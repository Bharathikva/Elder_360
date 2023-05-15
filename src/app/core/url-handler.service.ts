import * as dotenv from "dotenv";
// import { env } from 'process';

import { Injectable } from '@angular/core';

const BASEURL: string = process.env['BASEURL'] + '';
console.log("elll",BASEURL)
@Injectable()
export class API {

  LOGIN = BASEURL + '/user/login';

  SIGNUP = BASEURL + '/user/signup';

  PROFILE = BASEURL + '/user';

  SEND_OTP = BASEURL + '/user/login';

  VERIFY_OTP = BASEURL + '/user/verify-otp';

  PAY_ORDER = BASEURL + '/orders/pay';
}

// export default new API;
