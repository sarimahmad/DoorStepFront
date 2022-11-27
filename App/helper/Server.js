import {Platform} from 'react-native';

const Server = {
  local:
    Platform.OS === 'android'
      ? 'http://82ff-39-46-54-160.ngrok.io'
      : 'http://127.0.0.1:8000',
};

export default Server.local;
