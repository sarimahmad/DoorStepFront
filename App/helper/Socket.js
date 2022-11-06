import {Platform} from 'react-native';

const ServerSocker = {
  local:
    Platform.OS === 'android'
      ? 'ws://1ff5-203-128-21-151.ngrok.io'
      : 'ws://127.0.0.1:8000',
};

export default ServerSocker.local;
