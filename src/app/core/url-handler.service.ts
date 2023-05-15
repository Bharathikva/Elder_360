require('dotenv').config();
import { env } from 'process';

import { Injectable } from '@angular/core';

const BASEURL: string = env['BASEURL'] + '';
@Injectable()
export class API {
  //  = 'http://localhost:8080',

  LOGIN = BASEURL + '/user/login';

  SIGNUP = BASEURL + '/user/signup';

  PROFILE = BASEURL + '/user';

  SEND_OTP = BASEURL + '/user/login';

  VERIFY_OTP = BASEURL + '/user/verify-otp';

  PAY_ORDER = BASEURL + '/orders/pay';
}

// export default new API;
