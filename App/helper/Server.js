import {Platform} from 'react-native';

const Server = {
  local:
    Platform.OS === 'android'
      ? 'https://1d44-119-160-96-137.eu.ngrok.io'
      : 'http://127.0.0.1:8000',
};

export default Server.local;
