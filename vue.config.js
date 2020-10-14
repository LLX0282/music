
module.exports = {
	//axios域代理，解决axios跨域问题
	devServer: {
		proxy: {
			'/prod-api': {
				target:  'http://34d6o10522.zicp.vip', //后台ip地址
				changeOrigin: true, // 跨域访问设置，true代表跨域
				ws: true,
				secure: false, // false为http访问，true为https访问
				pathRewrite: {
					'^/prod-api': '/'//看情况重定向接口中没有相同的字段设置为空 否则反之
					//'^/api': '/api'   // 这种接口配置出来     http://XX.XX.XX.XX:8083/api/login
                    //'^/api': '/' 这种接口配置出来     http://XX.XX.XX.XX:8083/login
				}
			},
		}
	}
}