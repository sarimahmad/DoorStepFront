import {Platform} from 'react-native';

const Server = {
  local:
    Platform.OS === 'android'
      ? 'https://7bbd-39-46-41-54.in.ngrok.io'
      : 'http://127.0.0.1:8000',
};

export default Server.local;
