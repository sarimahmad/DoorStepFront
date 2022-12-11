import {Platform} from 'react-native';

const Server = {
  local:
    Platform.OS === 'android'
      ? 'http://1694-39-46-58-14.ngrok.io'
      : 'http://127.0.0.1:8000',
};

export default Server.local;
