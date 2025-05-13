import smartсaptcha from './smartсaptcha-wrapper'

export default {
  name: 'VueSmartcaptcha',
  props: {
    sitekey: {
      type: String,
      required: true
    },
    hl: {
      type: String,
      default: ''
    },
    test: {
      type: Boolean,
      default: false
    },
    webview: {
      type: Boolean,
      default: false
    },
    invisible: {
      type: Boolean,
      default: false
    },
    shieldPosition: {
      type: String
    },
    hideShield: {
      type: Boolean
    },
    loadSmartсaptchaScript: {
      type: Boolean,
      default: false
    },
    smartсaptchaScriptId: {
      type: String,
      default: '__SMARTCAPTCHA_SCRIPT'
    },
    smartсaptchaHost: {
      type: String,
      default: 'smartcaptcha.yandexcloud.net'
    }
  },
  beforeMount () {
    if (this.loadSmartсaptchaScript) {
      if (!document.getElementById(this.smartсaptchaScriptId)) {
        // Note: vueSmartcaptchaApiLoaded load callback name is per the latest documentation
        const script = document.createElement('script')
        script.id = this.smartсaptchaScriptId
        script.src = `https://${this.smartсaptchaHost}/captcha.js?render=onload&onload=vueSmartcaptchaApiLoaded`
        script.async = true
        script.defer = true

        document.head.appendChild(script)
      }
    }
  },
  mounted () {
    smartсaptcha.checkSmartcaptchaLoad()
    const opts = {
      ...this.$props,
      callback: this.emitVerify// ,
      // 'expired-callback': this.emitExpired,
      // 'error-callback': this.emitError
    }
    const container = this.$slots.default ? this.$el.children[0] : this.$el
    smartсaptcha.render(container, opts, id => {
      this.$widgetId = id
      this.$emit('render', id)
    })
  },
  methods: {
    reset () {
      smartсaptcha.reset(this.$widgetId)
    },
    execute () {
      smartсaptcha.execute(this.$widgetId)
    },
    emitVerify (response) {
      this.$emit('verify', response)
    }// ,
    /*
    emitExpired () {
      this.$emit('expired')
    },
    emitError () {
      this.$emit('error')
    }
    */
  },
  render (h) {
    return h('div', {}, this.$slots.default)
  }
}
