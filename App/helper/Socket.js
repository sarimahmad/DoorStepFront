import {Platform} from 'react-native';

const ServerSocker = {
  local:
    Platform.OS === 'android'
      ? 'ws://0b18-103-255-4-2.ngrok.io'
      : 'ws://127.0.0.1:8000',
};

export default ServerSocker.local;
