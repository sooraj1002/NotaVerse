import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  login() {
    return { msg: 'You have logged in' };
  }

  signup() {
    return { msg: 'You have successfully signed up' };
  }
}
