import * as dotenv from 'dotenv';

import { Injectable } from '@angular/core';

const BASEURL: string = process.env['BASEURL'] || '';
@Injectable({
  providedIn: 'any',
})
export class API {
  LOGIN: string = BASEURL + '/user/login';

  SIGNUP: string = BASEURL + '/user/signup';

  PROFILE: string = BASEURL + '/user';

  SEND_OTP: string = BASEURL + '/user/login';

  VERIFY_OTP: string = BASEURL + '/user/verify-otp';

  PAY_ORDER: string = BASEURL + '/orders/pay';

  GENERATE_REF_ACCESS_TOKEN: string = BASEURL + '/token/auth';

}

// export default new API;
