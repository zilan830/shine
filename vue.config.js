module.exports = {
  lintOnSave: false,
  devServer: {
    port: 9990,
    proxy: {
      '/*': {
        target: 'http://172.16.0.125:8080/',
        changeOrigin: true,
        ws: true,
      },
    },
  },
};
