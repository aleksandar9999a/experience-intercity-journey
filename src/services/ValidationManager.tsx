import { injectable } from 'inversify';

// Validations
import isEmail from 'validator/lib/isEmail';
import isAfter from 'validator/lib/isAfter';

// Interfaces
import { IPublication } from '../interfaces/interfaces';


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

  getPublicationError (publication: IPublication | null) {
    const typesOfTransport = ['transport', 'drive'];

    if (!publication) {
        return 'Invalid publication.';
    }
    
    if (publication.from.length < 3 || publication.to.length < 3) {
        return 'Invalid locations. Minimum chars are 3!';
    }

    if (!isAfter(publication.date)) {
        return 'You must enter a date after today!';
    }

    if (!typesOfTransport.includes(publication.type)) {
        return 'Invalid type of transport!';
    }

    return false;
  }
}