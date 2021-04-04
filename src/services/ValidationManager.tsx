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
      return Promise.reject(new Error('Email format is invalid!'));
    }

    if (password.length < 8 || password.length > 20) {
      return Promise.reject(new Error('Password is invalid. Minimum length is 8 chars, max - 20 chars.'));
    }

    return Promise.resolve('No errors');
  }

  getRegisterError (email: string, password: string, rePassword: string, city: string, firstName: string, lastName: string) {
    if (!isEmail(email)) {
      return Promise.reject(new Error('Email format is invalid!'));
    }

    if (password.length < 8 || password.length > 20) {
      return Promise.reject(new Error('Password is invalid. Minimum length is 8 chars, max - 20 chars.'));
    }

    if (rePassword !== password) {
      return Promise.reject(new Error('Passwords not match!'));
    }

    if (city.length < 3 || city.length > 20) {
      return Promise.reject(new Error('City is invalid.'));
    }

    if (firstName.length < 4 || firstName.length > 20) {
      return Promise.reject(new Error('First name is invalid. Minimum length is 4 chars, max - 20 chars.'));
    }

    if (lastName.length < 4 || lastName.length > 20) {
      return Promise.reject(new Error('Last name is invalid. Minimum length is 4 chars, max - 20 chars.'));
    }

    return Promise.resolve('No errors');
  }

  getPublicationError (publication: IPublication | null) {
    const typesOfTransport = ['transport', 'drive'];

    if (!publication) {
        return Promise.reject(new Error('Invalid publication.'));
    }

    if (publication.from.length < 3 || publication.to.length < 3) {
        return Promise.reject(new Error('Invalid locations. Minimum chars are 3!'));
    }

    if (!isAfter(publication.date)) {
        return Promise.reject(new Error('You must enter a date after today!'));
    }

    if (!typesOfTransport.includes(publication.type)) {
        return Promise.reject(new Error('Invalid type of transport!'));
    }

    return Promise.resolve('No errors');
  }

  getUserdataError ({ firstName, lastName, city }: { firstName: string, lastName: string, city: string }) {
    if (city.length < 3 || city.length > 20) {
      return Promise.reject(new Error('City is invalid.'));
    }

    if (firstName.length < 4 || firstName.length > 20) {
      return Promise.reject(new Error('First name is invalid. Minimum length is 4 chars, max - 20 chars.'));
    }

    if (lastName.length < 4 || lastName.length > 20) {
      return Promise.reject(new Error('Last name is invalid. Minimum length is 4 chars, max - 20 chars.'));
    }

    return Promise.resolve('No errors');
  }
}