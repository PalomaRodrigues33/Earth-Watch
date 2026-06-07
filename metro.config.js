// Configuração do Metro Bundler
// Garante que apenas uma cópia do React seja incluída no bundle,
// evitando o erro "useMemo of null" causado por dependências duplicadas.

const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === 'react' || moduleName === 'react-native') {
    return {
      filePath: path.resolve(__dirname, `node_modules/${moduleName}/index.js`),
      type: 'sourceFile',
    };
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
