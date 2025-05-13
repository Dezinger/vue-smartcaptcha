function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

var defer = function defer() {
  var state = false; // Resolved or not

  var callbacks = [];

  var resolve = function resolve(val) {
    if (state) {
      return;
    }

    state = true;

    for (var i = 0, len = callbacks.length; i < len; i++) {
      callbacks[i](val);
    }
  };

  var then = function then(cb) {
    if (!state) {
      callbacks.push(cb);
      return;
    }

    cb();
  };

  var deferred = {
    resolved: function resolved() {
      return state;
    },
    resolve: resolve,
    promise: {
      then: then
    }
  };
  return deferred;
};

var ownProp = Object.prototype.hasOwnProperty;
function createSmartcaptcha() {
  var deferred = defer();
  return {
    notify: function notify() {
      deferred.resolve();
    },
    wait: function wait() {
      return deferred.promise;
    },
    // https://yandex.cloud/en/docs/smartcaptcha/concepts/widget-methods#render
    render: function render(ele, options, cb) {
      this.wait().then(function () {
        cb(window.smartCaptcha.render(ele, options));
      });
    },
    // https://yandex.cloud/en/docs/smartcaptcha/concepts/widget-methods#reset
    reset: function reset(widgetId) {
      if (typeof widgetId === 'undefined') {
        return;
      }

      this.assertLoaded();
      this.wait().then(function () {
        return window.smartCaptcha.reset(widgetId);
      });
    },
    // https://yandex.cloud/en/docs/smartcaptcha/concepts/widget-methods#execute
    execute: function execute(widgetId) {
      if (typeof widgetId === 'undefined') {
        return;
      }

      this.assertLoaded();
      this.wait().then(function () {
        return window.smartCaptcha.execute(widgetId);
      });
    },
    // https://yandex.cloud/en/docs/smartcaptcha/concepts/widget-methods#getResponse
    getResponse: function getResponse(widgetId) {
      if (typeof widgetId === 'undefined') {
        return;
      }

      this.assertLoaded();
      this.wait().then(function () {
        return window.smartCaptcha.getResponse(widgetId);
      });
    },
    // https://yandex.cloud/en/docs/smartcaptcha/concepts/widget-methods#destroy
    destroy: function destroy(widgetId) {
      if (typeof widgetId === 'undefined') {
        return;
      }

      this.assertLoaded();
      this.wait().then(function () {
        return window.smartCaptcha.destroy(widgetId);
      });
    },
    checkSmartcaptchaLoad: function checkSmartcaptchaLoad() {
      if (ownProp.call(window, 'smartCaptcha') && ownProp.call(window.smartCaptcha, 'render')) {
        this.notify();
      }
    },
    assertLoaded: function assertLoaded() {
      if (!deferred.resolved()) {
        throw new Error('SmartCAPTCHA has not been loaded');
      }
    }
  };
}
var smartcaptcha = createSmartcaptcha();

if (typeof window !== 'undefined') {
  window.vueSmartcaptchaApiLoaded = smartcaptcha.notify;
}

var VueSmartcaptcha = {
  name: 'VueSmartcaptcha',
  props: {
    sitekey: {
      type: String,
      required: true
    },
    hl: {
      type: String,
      "default": ''
    },
    test: {
      type: Boolean,
      "default": false
    },
    webview: {
      type: Boolean,
      "default": false
    },
    invisible: {
      type: Boolean,
      "default": false
    },
    shieldPosition: {
      type: String
    },
    hideShield: {
      type: Boolean
    },
    loadSmartсaptchaScript: {
      type: Boolean,
      "default": false
    },
    smartсaptchaScriptId: {
      type: String,
      "default": '__SMARTCAPTCHA_SCRIPT'
    },
    smartсaptchaHost: {
      type: String,
      "default": 'smartcaptcha.yandexcloud.net'
    }
  },
  beforeMount: function beforeMount() {
    if (this.loadSmartсaptchaScript) {
      if (!document.getElementById(this.smartсaptchaScriptId)) {
        // Note: vueSmartcaptchaApiLoaded load callback name is per the latest documentation
        var script = document.createElement('script');
        script.id = this.smartсaptchaScriptId;
        script.src = "https://" + this.smartсaptchaHost + "/captcha.js?render=onload&onload=vueSmartcaptchaApiLoaded";
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      }
    }
  },
  mounted: function mounted() {
    var _this = this;

    smartcaptcha.checkSmartcaptchaLoad();

    var opts = _extends({}, this.$props, {
      callback: this.emitVerify // ,
      // 'expired-callback': this.emitExpired,
      // 'error-callback': this.emitError

    });

    var container = this.$slots["default"] ? this.$el.children[0] : this.$el;
    smartcaptcha.render(container, opts, function (id) {
      _this.$widgetId = id;

      _this.$emit('render', id);
    });
  },
  methods: {
    reset: function reset() {
      smartcaptcha.reset(this.$widgetId);
    },
    execute: function execute() {
      smartcaptcha.execute(this.$widgetId);
    },
    emitVerify: function emitVerify(response) {
      this.$emit('verify', response);
    } // ,

    /*
    emitExpired () {
      this.$emit('expired')
    },
    emitError () {
      this.$emit('error')
    }
    */

  },
  render: function render(h) {
    return h('div', {}, this.$slots["default"]);
  }
};

export default VueSmartcaptcha;
