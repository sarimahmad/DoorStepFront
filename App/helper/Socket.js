import {Platform} from 'react-native';

const ServerSocker = {
  local:
    Platform.OS === 'android'
      ? 'ws://82ff-39-46-54-160.ngrok.io'
      : 'ws://127.0.0.1:8000',
};

export default ServerSocker.local;
