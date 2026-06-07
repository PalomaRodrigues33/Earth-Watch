import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'Mars Weather',
  slug: 'mars-weather',
  version: '1.0.0',
  orientation: 'portrait',
  scheme: 'mars-weather',
  userInterfaceStyle: 'dark',
  newArchEnabled: true,
  splash: {
    backgroundColor: '#0a0400',
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.yourname.marsweather',
  },
  android: {
    adaptiveIcon: {
      backgroundColor: '#0a0400',
    },
    package: 'com.yourname.marsweather',
  },
  plugins: ['expo-router', 'expo-font'],
  experiments: {
    typedRoutes: true,
  },
});
