
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? './'
    : '',
  outputDir: 'dist_dhexo',
  lintOnSave: false,
  // 热加载
  chainWebpack: config => {
    config.resolve.symlinks(true)
  },
  // 配置开发环境api
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    },
    proxy: {
      '/api': {
        // target: 'http://39.105.58.173:18081',
        // target: 'http://52.82.15.67:18081',  // 测试vcf
        target: 'https://dhexo.dhtongliang.cn',  // 测试vcf
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
    }
  },
  // css: {
  //   extract: false
  // }
}