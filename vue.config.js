module.exports = {
  lintOnSave: false,

  devServer: {
    port: 9990,
    assetsPublicPath: '/',
    // public: 'http://192.168.3.142:9990/',
    // proxy: {
    //   '/*': {
    //     target: 'http://172.16.0.125:8086/',
    //     changeOrigin: true,
    //     ws: false,
    //   },
    // },
  },

  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        import: [
          './src/theme',
        ],
      },
    },
  },

  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true,
    },
  },
};
