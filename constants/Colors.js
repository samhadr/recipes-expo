import { Platform } from 'react-native';

const sageGreen = Platform.OS === 'ios' ? '#5FAA5A' : '#7FAA6E';
const gold = Platform.OS === 'ios' ? '#F2E581' : '#F6EB9F';

export default {
  sageGreen,
  gold,
};
