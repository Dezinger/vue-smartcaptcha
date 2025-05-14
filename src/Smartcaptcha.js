import smartcaptcha from './smartcaptcha-wrapper'

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
    loadSmartcaptchaScript: {
      type: Boolean,
      default: false
    },
    smartcaptchaScriptId: {
      type: String,
      default: '__SMARTCAPTCHA_SCRIPT'
    },
    smartcaptchaHost: {
      type: String,
      default: 'smartcaptcha.yandexcloud.net'
    }
  },
  beforeMount () {
    if (this.loadSmartcaptchaScript) {
      if (!document.getElementById(this.smartcaptchaScriptId)) {
        // Note: vueSmartcaptchaApiLoaded load callback name is per the latest documentation
        const script = document.createElement('script')
        script.id = this.smartcaptchaScriptId
        script.src = `https://${this.smartcaptchaHost}/captcha.js?render=onload&onload=vueSmartcaptchaApiLoaded`
        script.async = true
        script.defer = true

        document.head.appendChild(script)
      }
    }
  },
  mounted () {
    smartcaptcha.checkSmartcaptchaLoad()
    const opts = {
      ...this.$props,
      callback: this.emitVerify// ,
      // 'expired-callback': this.emitExpired,
      // 'error-callback': this.emitError
    }
    const container = this.$slots.default ? this.$el.children[0] : this.$el
    smartcaptcha.render(container, opts, id => {
      this.$widgetId = id
      this.$emit('render', id)
    })
  },
  methods: {
    reset () {
      smartcaptcha.reset(this.$widgetId)
    },
    execute () {
      smartcaptcha.execute(this.$widgetId)
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
