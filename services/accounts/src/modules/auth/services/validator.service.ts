
import * as isemail from 'isemail';
import {HttpErrors} from '@loopback/rest';
import { Credentials } from 'microservices-core/dist/models/types';

export function validateCredentials(credentials: Credentials) {
  // Validate Email
  if (credentials && credentials.username && !isemail.validate(credentials.username)) {
    throw new HttpErrors.UnprocessableEntity('invalid email');
  }

  // Validate Password Length
  if (credentials.password.length < 8) {
    throw new HttpErrors.UnprocessableEntity(
      'password must be minimum 8 characters',
    );
  }
}