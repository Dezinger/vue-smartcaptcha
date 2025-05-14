/* global Vue: false, VueSmartcaptcha: false */
// eslint-disable-next-line no-new
new Vue({
  el: '#root',
  data: {
    sitekey: '1234'
  },
  components: {
    'vue-smartcaptcha': VueSmartcaptcha
  },
  methods: {
    onSubmit: function () {
      this.$refs.invisibleSmartcaptcha.execute()
    },
    onVerify: function (response) {
      console.log('Verify: ' + response)
    },
    resetSmartcaptcha () {
      this.$refs.defaultSmartcaptcha.reset() // Direct call reset method
    }
  }
})
