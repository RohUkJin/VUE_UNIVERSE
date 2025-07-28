const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // GitHub Pages 배포용 설정
  publicPath: process.env.NODE_ENV === 'production' 
    ? '/universe/' // 저장소명에 맞게 변경하세요
    : '/',
  outputDir: 'dist',
  assetsDir: 'static',
  // GitHub Pages에서 이미지 경로 문제 해결
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = 'Universe';
      return args;
    });
  }
})
