module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    // This is for getting .env file purpose
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: './config/.env',
        blacklist: null,
        whitelist: null,
        safe: true,
        allowUndefined: false,
      },
    ],

    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          "@stores": './src/stores',
          "@components": './src/components',
          "@screens": './src/screens',
          "@constants": './src/constants',
          "@helpers": './src/helpers',
          "@navigations": './src/navigations',
          "@tasks": './src/tasks',
          "@test": './src/tests',
          "@composables": './src/composables'
        },
      },
    ],

    ['react-native-reanimated/plugin'],
  ],
};
