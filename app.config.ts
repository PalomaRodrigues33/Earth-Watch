import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'EarthWatch',
  slug: 'earthwatch',
  version: '1.0.0',
  orientation: 'portrait',
  scheme: 'earthwatch',
  userInterfaceStyle: 'dark',
  newArchEnabled: true,
  splash: {
    backgroundColor: '#0a0400',
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.yourname.earthwatch',
  },
  android: {
    adaptiveIcon: {
      backgroundColor: '#0a0400',
    },
    package: 'com.yourname.earthwatch',
  },
  plugins: ['expo-router', 'expo-font'],
  experiments: {
    typedRoutes: true,
  },
});
