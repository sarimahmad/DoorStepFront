import {Platform} from 'react-native';

const ServerSocker = {
  local:
    Platform.OS === 'android'
      ? 'ws://4c47-39-46-24-143.ngrok.io'
      : 'ws://127.0.0.1:8000',
};

export default ServerSocker.local;
