import {Platform} from 'react-native';

const ServerSocker = {
  local:
    Platform.OS === 'android'
      ? 'ws://fba3-39-46-32-90.ngrok.io'
      : 'ws://127.0.0.1:8000',
};

export default ServerSocker.local;
