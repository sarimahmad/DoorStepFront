import {Platform} from 'react-native';

const Server = {
  local:
    Platform.OS === 'android'
      ? 'http://fba3-39-46-32-90.ngrok.io'
      : 'http://127.0.0.1:8000',
};

export default Server.local;
