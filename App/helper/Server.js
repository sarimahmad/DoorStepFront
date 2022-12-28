import {Platform} from 'react-native';

const Server = {
  local:
    Platform.OS === 'android'
      ? 'http://3a8b-39-46-37-67.ngrok.io'
      : 'http://127.0.0.1:8000',
};

export default Server.local;
