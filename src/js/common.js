export default {
  data: ()=> ({
    deviceName: 'pc',
    weixinPlatform: true,
  }),
  methods: {
    deviceFn(){
			if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { //判断iPhone|iPad|iPod|iOS
				this.deviceName = 'ios'
			} else if (/(Android)/i.test(navigator.userAgent)) { //判断Android
				this.deviceName = 'android'
			} else { //pc
				this.deviceName = 'pc'
			}
		},
    wechatFn() {
      let weixinDevice = true
      let ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        weixinDevice = true
      } else {
        weixinDevice = false
      }
      this.weixinPlatform = weixinDevice
      // return weixinDevice
    },
  },
  created(){
    this.deviceFn()
    this.wechatFn()
  }
}
