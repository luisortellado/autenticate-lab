import axios from 'axios';
import * as Keychain from 'react-native-keychain';
import {refreshToken} from './AuthService';

const api = axios.create({
  baseURL: 'https://example.com/api',
});

api.interceptors.request.use(async config => {
  const credentials = await Keychain.getGenericPassword();
  if (credentials) {
    let {token, expiresAt} = JSON.parse(credentials.password);

    if (Date.now() > expiresAt) {
      console.log('Token expired, attempting to refresh...');
      try {
        const {token: newToken, expiresAt: newExpiresAt} = await refreshToken();
        token = newToken;
        expiresAt = newExpiresAt;
        await Keychain.setGenericPassword(
          'authToken',
          JSON.stringify({token, expiresAt}),
        );
        console.log('Token refreshed successfully');
      } catch (error) {
        console.error('Token refresh failed. Redirecting to login.');
        await Keychain.resetGenericPassword();
        throw error;
      }
    }

    config.headers.Authorization = `Bearer ${token}`;
  }

  console.log(config, 'config');
  return config;
});

export default api;
