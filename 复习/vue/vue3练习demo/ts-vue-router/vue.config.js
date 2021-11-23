const targetUrl=`http://47.101.140.48:9533`
const     proxyTable= {
  '/auth': {
    // target: 'http://101.132.162.31:9081',
    target: targetUrl,
    changeOrigin: true,
    // pathRewrite:{
    //   '^/api':''
    // }
  },
  '/mdata': {
    target: targetUrl,
    changeOrigin: true,
  },
  '/r': {
    target: targetUrl,
    changeOrigin: true,
  },
  '/api': {
    target: targetUrl,
    changeOrigin: true,
  },
  '/file': {
    target: targetUrl,
    changeOrigin: true,
  },
  '/expense': {
    target: targetUrl,
    changeOrigin: true,
  },
  '/base': {
    target: targetUrl,
    changeOrigin: true,
  },
  '/peripheral': {
    target: targetUrl,
    changeOrigin: true,
  },
  '/contract': {
    target: targetUrl,
    changeOrigin: true,
  },
  '/prepayment': {
    target: targetUrl,
    changeOrigin: true,
  },
  '/workflow': {
    target: targetUrl,
    changeOrigin: true,
  },
  '/workbench': {
    target: targetUrl,
    changeOrigin: true,
  },
  '/tax': {
    target: targetUrl,
    changeOrigin: true,
  },
  '/budget': {
    target: targetUrl,
    changeOrigin: true,
  },
  '/fund': {
    target: targetUrl,
    changeOrigin: true,
  },
  '/payment': {
    target: targetUrl,
    changeOrigin: true,
  },
  '/book': {
    target: targetUrl,
    changeOrigin: true,
  },
  '/view':{
    target: targetUrl,
    changeOrigin: true,
  },
  '/cgi-bin': {
    target: 'https://qyapi.weixin.qq.com',
    changeOrigin: true,
  },
  '/SwitchAPI': {
    target: 'https://ct.ctrip.com',
    changeOrigin: true,
  },
  '/switchapi': {
    target: 'https://ct.ctrip.com',
    changeOrigin: true,
  },
  '/mobile': {
    target: targetUrl,
    changeOrigin: true,
  },
  '/baidu':{
    target: 'https://www.baidu.com',
    changeOrigin: true,
  },
  '/order':{
    target: 'http://ttms-ops-api.tuniu-sit.com',
    changeOrigin: true,
  }
}

module.exports = {
  // cli3 代理是从指定的target后面开始匹配的，不是任意位置；配置pathRewrite可以做替换
  devServer: {
    proxy:proxyTable
  }
}