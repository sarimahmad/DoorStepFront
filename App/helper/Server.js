import {Platform} from 'react-native';

const Server = {
  local:
    Platform.OS === 'android'
      ? 'http://bcd0-39-46-101-10.ngrok.io'
      : 'http://127.0.0.1:8000',
};

export default Server.local;
