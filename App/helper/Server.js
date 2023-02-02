import {Platform} from 'react-native';

const Server = {
  local:
    Platform.OS === 'android'
      ? 'http://0b18-103-255-4-2.ngrok.io'
      : 'http://127.0.0.1:8000',
};

export default Server.local;
