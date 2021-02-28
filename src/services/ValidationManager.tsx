import { injectable } from 'inversify';

// Validations
import isEmail from 'validator/lib/isEmail';


@injectable()
export class ValidationManager {
  getLoginError (email: string, password: string) {
    if (!isEmail(email)) {
      return 'Email format is invalid!';
    }

    if (password.length < 8 || password.length > 20) {
      return 'Password is invalid. Minimum length is 8 chars, max - 20 chars.';
    }

    return false;
  }

  getRegisterError (email: string, password: string, rePassword: string, city: string, firstName: string, lastName: string) {
    if (!isEmail(email)) {
      return 'Email format is invalid!';
    }

    if (password.length < 8 || password.length > 20) {
      return 'Password is invalid. Minimum length is 8 chars, max - 20 chars.';
    }

    if (rePassword !== password) {
      return 'Passwords not match!';
    }

    if (city.length < 3 || city.length > 20) {
      return 'City is invalid.';
    }

    if (firstName.length < 4 || firstName.length > 20) {
      return 'First name is invalid. Minimum length is 4 chars, max - 20 chars.';
    }

    if (lastName.length < 4 || lastName.length > 20) {
      return 'Last name is invalid. Minimum length is 4 chars, max - 20 chars.';
    }

    return false;
  }
}