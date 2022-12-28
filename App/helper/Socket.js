import {Platform} from 'react-native';

const ServerSocker = {
  local:
    Platform.OS === 'android'
      ? 'ws://3a8b-39-46-37-67.ngrok.io'
      : 'ws://127.0.0.1:8000',
};

export default ServerSocker.local;
