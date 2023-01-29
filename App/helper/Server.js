import {Platform} from 'react-native';

const Server = {
  local:
    Platform.OS === 'android'
      ? 'http://4c47-39-46-24-143.ngrok.io'
      : 'http://127.0.0.1:8000',
};

export default Server.local;
