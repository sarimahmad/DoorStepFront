import {Platform} from 'react-native';

const Server = {
  local:
    Platform.OS === 'android'
      ? 'http://2dba-111-119-187-31.ngrok.io'
      : 'http://127.0.0.1:8000',
};

export default Server.local;
