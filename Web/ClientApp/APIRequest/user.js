
import axios from 'axios';
import { BaseUrl } from './config';

export default {

  login(field) {
	  return axios.post(`${BaseUrl}/Account/Login`, field,
      {
          headers: {
              'Content-Type': 'application/json',
          }
      })
      .then((response) => response)
      .catch((err) => ({
        details: err,
        error: true,
      }));
  },

  register(field) {
	  return axios.post(`${BaseUrl}/Account/Register`, field,
      {
          headers: {
              'Content-Type': 'application/json',
          }
      })
      .then((response) => response)
      .catch((err) => ({
        details: err,
        error: true,
      }));
  },

  validateAuth(token) {
    const AuthStr = `Bearer ${token}`;
	return axios.get(`${BaseUrl}/TestAuth`, {
		headers: {
			Authorization: AuthStr,
		}
	})
      .then((response) => response)
      .catch((err) => ({
        details: err,
        error: true,
      }));
  },
};
