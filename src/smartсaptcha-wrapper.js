import defer from './defer'

const ownProp = Object.prototype.hasOwnProperty

export function createSmartcaptcha () {
  const deferred = defer()

  return {
    notify () {
      deferred.resolve()
    },

    wait () {
      return deferred.promise
    },

    // https://yandex.cloud/en/docs/smartcaptcha/concepts/widget-methods#render
    render (ele, options, cb) {
      this.wait().then(() => {
        cb(window.smartCaptcha.render(ele, options))
      })
    },

    // https://yandex.cloud/en/docs/smartcaptcha/concepts/widget-methods#reset
    reset (widgetId) {
      if (typeof widgetId === 'undefined') {
        return
      }

      this.assertLoaded()
      this.wait().then(() => window.smartCaptcha.reset(widgetId))
    },

    // https://yandex.cloud/en/docs/smartcaptcha/concepts/widget-methods#execute
    execute (widgetId) {
      if (typeof widgetId === 'undefined') {
        return
      }

      this.assertLoaded()
      this.wait().then(() => window.smartCaptcha.execute(widgetId))
    },

    // https://yandex.cloud/en/docs/smartcaptcha/concepts/widget-methods#getResponse
    getResponse (widgetId) {
      if (typeof widgetId === 'undefined') {
        return
      }

      this.assertLoaded()
      this.wait().then(() => window.smartCaptcha.getResponse(widgetId))
    },

    // https://yandex.cloud/en/docs/smartcaptcha/concepts/widget-methods#destroy
    destroy (widgetId) {
      if (typeof widgetId === 'undefined') {
        return
      }

      this.assertLoaded()
      this.wait().then(() => window.smartCaptcha.destroy(widgetId))
    },

    checkSmartcaptchaLoad () {
      if (ownProp.call(window, 'smartCaptcha') && ownProp.call(window.smartCaptcha, 'render')) {
        this.notify()
      }
    },

    assertLoaded () {
      if (!deferred.resolved()) {
        throw new Error('SmartCAPTCHA has not been loaded')
      }
    }
  }
}

const smartcaptcha = createSmartcaptcha()

if (typeof window !== 'undefined') {
  window.vueSmartcaptchaApiLoaded = smartcaptcha.notify
}

export default smartcaptcha
